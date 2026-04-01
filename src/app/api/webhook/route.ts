import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { sendPurchaseEmail } from '@/lib/email';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not defined');
    }

    // Verify webhook signature
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    try {
      event = getStripe().webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown signature error';
      console.error('Webhook signature verification failed:', errorMessage);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const productSlug = session.metadata?.productSlug;
      const productName = session.metadata?.productName;
      const customerEmail =
        session.customer_email || session.customer_details?.email;
      const amountTotal = session.amount_total || 0;

      // Log the purchase
      console.log('Purchase completed:', {
        productSlug,
        productName,
        customerEmail,
        amountTotal,
        sessionId: session.id,
        timestamp: new Date().toISOString(),
      });

      // Send the download email via Resend
      if (customerEmail && productSlug && productName) {
        const isVault =
          productSlug === 'the-vault' ||
          productSlug === 'thanksgiving-marriage-vault';

        const baseUrl =
          process.env.NEXT_PUBLIC_URL || 'https://deadhidden.org';
        const downloadUrl = `${baseUrl}/store/${productSlug}/success?session_id=${session.id}`;

        try {
          await sendPurchaseEmail({
            customerEmail,
            productName,
            productSlug,
            isVault,
            downloadUrl,
            amountPaid: amountTotal,
          });
          console.log('Purchase email sent to:', customerEmail);
        } catch (emailError) {
          // Log but don't fail the webhook — buyer still has the success page
          console.error('Failed to send purchase email:', emailError);
        }
      } else {
        console.warn('Missing email or product info, skipping email:', {
          customerEmail,
          productSlug,
          productName,
        });
      }

      return NextResponse.json({ received: true });
    }

    // Return 200 OK for all other events
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
