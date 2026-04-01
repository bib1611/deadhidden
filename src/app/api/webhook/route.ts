import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
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
      const customerEmail = session.customer_email;
      const amountTotal = session.amount_total;

      // Log the purchase
      console.log('Purchase completed:', {
        productSlug,
        productName,
        customerEmail,
        amountTotal,
        sessionId: session.id,
        timestamp: new Date().toISOString(),
      });

      // TODO: Send email with PDF download link
      // Implementation: Use email service (Resend, SendGrid, etc.) to send download link to customerEmail

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
