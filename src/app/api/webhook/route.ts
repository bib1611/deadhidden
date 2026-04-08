import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { sendPurchaseEmail, getResend } from '@/lib/email';
import Stripe from 'stripe';

const AUDIENCE_ID = '853ea354-ef8b-4781-86cd-1b1032ad247e';

// Price tier thresholds in cents
const TIER_7_MAX = 2000;   // up to $20 = $7 tier
const TIER_97 = 9700;      // $97 = Essential Arsenal
const TIER_VAULT = 36500;  // $365 = Vault

// Slugs that map to specific products for tagging
const VAULT_SLUGS = ['the-vault', 'thanksgiving-marriage-vault'];
const ARSENAL_SLUGS = ['essential-arsenal'];
const TABLE_SLUGS = ['the-table'];

export const runtime = 'nodejs';

/**
 * Determine purchase tier tags based on amount and product slug.
 * These tags drive Resend automation sequences:
 *   - purchase_7        → triggers Seq 1 ($7 → $97 upsell)
 *   - purchase_97       → triggers Seq 2 ($97 → $365 upsell), suppresses Seq 1
 *   - purchased_vault   → suppresses Seq 2
 *   - member_table      → suppresses Seq 3
 *   - purchase_any      → triggers Seq 3 (any → Table)
 */
function getPurchaseTags(slug: string, amountCents: number): string[] {
  const tags: string[] = ['purchase_any'];

  // Vault buyers
  if (VAULT_SLUGS.includes(slug) || amountCents >= TIER_VAULT) {
    tags.push('purchased_vault', 'purchased_97');
    return tags;
  }

  // Essential Arsenal buyers
  if (ARSENAL_SLUGS.includes(slug) || amountCents >= TIER_97) {
    tags.push('purchase_97', 'purchased_97');
    return tags;
  }

  // Table membership
  if (TABLE_SLUGS.includes(slug)) {
    tags.push('member_table');
    return tags;
  }

  // $7 tier (anything under $20 that isn't free)
  if (amountCents > 0 && amountCents <= TIER_7_MAX) {
    tags.push('purchase_7');
  }

  return tags;
}

/**
 * Create or update a Resend contact with purchase tags.
 * Additive — never removes existing tags, only adds new ones.
 */
async function tagResendContact(
  email: string,
  tags: string[],
  productSlug: string,
  firstName?: string
) {
  const resend = getResend();

  try {
    // Resend's createContact is idempotent — updates if contact exists
    await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      firstName: firstName || undefined,
      unsubscribed: false,
    });
    console.log('Resend contact created/updated:', email);
  } catch (contactError) {
    // Contact might already exist — that's fine
    console.warn('Resend contact create (may already exist):', contactError);
  }

  // Tag the contact with purchase info
  // Resend doesn't have a native "add tags" API on contacts yet,
  // so we store tags via the contact's custom data fields.
  // For now, we send a tagging email to a dedicated internal address
  // that Resend automations can trigger on.
  //
  // Alternative: Use Resend's batch tag approach via audiences.
  // The actual automation sequences will be set up in the Resend dashboard
  // using broadcast triggers based on these tags.
  try {
    // Log tags for the automation system
    console.log('Purchase tags for', email, ':', tags.join(', '), '| product:', productSlug);

    // Send internal notification email for automation tracking
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Dead Hidden <noreply@deadhidden.org>',
      to: 'thebiblicalman1611@gmail.com',
      subject: `[AUTO] Purchase Tag: ${tags.join(', ')} — ${email}`,
      html: `
        <p><strong>Customer:</strong> ${email}</p>
        <p><strong>Product:</strong> ${productSlug}</p>
        <p><strong>Tags:</strong> ${tags.join(', ')}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p>Use these tags to trigger the appropriate Resend automation sequence.</p>
      `,
    });
  } catch (tagError) {
    console.error('Failed to send tag notification:', tagError);
  }
}

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

      const productSlug = session.metadata?.productSlug || '';
      const productName = session.metadata?.productName || '';
      const customerEmail =
        session.customer_email || session.customer_details?.email;
      const amountTotal = session.amount_total || 0;
      const customerName = session.customer_details?.name || '';

      // Log the purchase
      console.log('Purchase completed:', {
        productSlug,
        productName,
        customerEmail,
        amountTotal,
        sessionId: session.id,
        timestamp: new Date().toISOString(),
      });

      if (customerEmail) {
        // 1. Tag the contact in Resend for automation sequences
        const purchaseTags = getPurchaseTags(productSlug, amountTotal);
        const firstName = customerName ? customerName.split(' ')[0] : undefined;

        // Run tagging and email in parallel — neither should block the other
        const tagPromise = tagResendContact(
          customerEmail,
          purchaseTags,
          productSlug,
          firstName
        ).catch((err) => console.error('Contact tagging failed:', err));

        // 2. Send the download email via Resend
        let emailPromise: Promise<void> = Promise.resolve();
        if (productSlug && productName) {
          const isVault = VAULT_SLUGS.includes(productSlug);
          const baseUrl =
            process.env.NEXT_PUBLIC_URL || 'https://deadhidden.org';
          const downloadUrl = `${baseUrl}/success?session_id=${session.id}`;

          emailPromise = sendPurchaseEmail({
            customerEmail,
            productName,
            productSlug,
            isVault,
            downloadUrl,
            amountPaid: amountTotal,
          })
            .then(() => console.log('Purchase email sent to:', customerEmail))
            .catch((emailError) => {
              // Log but don't fail the webhook — buyer still has the success page
              console.error('Failed to send purchase email:', emailError);
            });
        } else {
          console.warn('Missing product info, skipping download email:', {
            customerEmail,
            productSlug,
            productName,
          });
        }

        // Wait for both to settle before responding
        await Promise.allSettled([tagPromise, emailPromise]);
      } else {
        console.warn('No customer email found, skipping all email actions:', {
          sessionId: session.id,
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
