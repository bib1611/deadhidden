import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { sendPurchaseEmail, getResend } from '@/lib/email';
import Stripe from 'stripe';

const AUDIENCE_ID = '853ea354-ef8b-4781-86cd-1b1032ad247e';

// Price tier thresholds in cents
const TIER_7_MAX = 2000;   // up to $20 = $7 tier
const TIER_97 = 9700;      // $97 = Essential Arsenal
const TIER_VAULT = 29700;  // $297 = Vault

// Slugs that map to specific products for tagging
const VAULT_SLUGS = ['the-vault', 'thanksgiving-marriage-vault'];
const ARSENAL_SLUGS = ['essential-arsenal', 'biblical-man-field-manual', 'biblical-woman-field-manual'];
const TABLE_SLUGS = ['the-table'];

export const runtime = 'nodejs';

/**
 * Determine purchase tier tags based on amount and product slug.
 * These tags drive Resend automation sequences:
 *   - purchase_7        → triggers Seq 1 ($7 → $97 upsell)
 *   - purchase_97       → triggers Seq 2 ($97 → $297 upsell), suppresses Seq 1
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
        const firstName = customerName ? customerName.split(' ')[0] : undefined;

        // ─── Dead Hidden Pro — v1 manual fulfillment branch ───
        // Pro is a subscription. There is no immediate file delivery — Adam
        // grants Substack comp + first guide token by hand. We send a Pro
        // welcome to the buyer and a notification to Adam, then exit early.
        if (productSlug === 'dead-hidden-pro') {
          const resend = getResend();
          const fromAddress =
            process.env.EMAIL_FROM ||
            'Dead Hidden <noreply@deadhidden.org>';

          // Buyer welcome
          const proWelcome = resend.emails
            .send({
              from: fromAddress,
              to: customerEmail,
              subject: 'You’re in. Welcome to Dead Hidden Pro.',
              html: `
                <div style="font-family:Georgia,'Times New Roman',serif;background:#0a0a0a;color:#e8e0d0;padding:40px 24px;max-width:600px;margin:0 auto;">
                  <h1 style="font-family:Oswald,sans-serif;text-transform:uppercase;letter-spacing:0.04em;color:#e8e0d0;font-size:28px;line-height:1.1;margin:0 0 16px;">Welcome to Dead Hidden Pro.</h1>
                  <p style="color:#8b0000;font-style:italic;margin:0 0 24px;">No retreats. Only advancement.</p>
                  <p style="line-height:1.7;margin:0 0 16px;">You're in. Here is what happens next.</p>
                  <ol style="line-height:1.8;padding-left:20px;">
                    <li><strong>Substack access</strong> &mdash; within 24 hours you'll be granted complimentary paid access to <a href="https://deadhidden.substack.com" style="color:#8b0000;">Dead Hidden</a> and <a href="https://thebiblicalman.substack.com" style="color:#8b0000;">The Biblical Man</a>. Watch your inbox for a Substack confirmation.</li>
                    <li><strong>Your first Guide Token</strong> &mdash; reply to this email with the guide you want this month (any paid guide except The Vault). I will send the secure download link within 24 hours.</li>
                    <li><strong>Every month</strong> &mdash; your subscription renews. A new Guide Token issues automatically. Tokens do not roll over &mdash; redeem each one within the month.</li>
                  </ol>
                  <p style="line-height:1.7;margin:24px 0 0;">Read the full catalog of guides at <a href="https://deadhidden.org/store" style="color:#8b0000;">deadhidden.org/store</a>.</p>
                  <p style="line-height:1.7;margin:16px 0 0;color:#888;font-size:14px;">Cancel anytime &mdash; access ends at the close of your billing cycle. Reply to this email for any support.</p>
                </div>
              `,
            })
            .then(() => console.log('Pro welcome sent to:', customerEmail))
            .catch((err) => console.error('Pro welcome send failed:', err));

          // Admin notification — drives manual Substack comp + token delivery
          const adminPing = resend.emails
            .send({
              from: fromAddress,
              to: 'thebiblicalman1611@gmail.com',
              subject: `[PRO] New subscriber: ${customerEmail}`,
              html: `
                <p><strong>New Dead Hidden Pro subscriber.</strong></p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                <p><strong>Name:</strong> ${customerName || '(not provided)'}</p>
                <p><strong>Stripe session:</strong> ${session.id}</p>
                <hr/>
                <p><strong>Manual fulfillment checklist:</strong></p>
                <ol>
                  <li>Open Substack admin for <strong>Dead Hidden</strong> &rarr; Subscribers &rarr; Add comp subscription for <code>${customerEmail}</code> (1-month renewable).</li>
                  <li>Open Substack admin for <strong>The Biblical Man</strong> &rarr; same comp subscription.</li>
                  <li>Wait for buyer reply with their first Guide Token redemption.</li>
                  <li>Send the secure download link from <code>/api/serve/[slug]?session_id=${session.id}</code> via Resend reply.</li>
                </ol>
              `,
            })
            .catch((err) => console.error('Pro admin ping failed:', err));

          // Tag the buyer for downstream automation
          const proTag = tagResendContact(
            customerEmail,
            ['purchase_any', 'member_pro'],
            productSlug,
            firstName
          ).catch((err) => console.error('Pro tagging failed:', err));

          await Promise.allSettled([proWelcome, adminPing, proTag]);
          return NextResponse.json({ received: true });
        }

        // ─── Standard one-time purchase flow ───
        // 1. Tag the contact in Resend for automation sequences
        const purchaseTags = getPurchaseTags(productSlug, amountTotal);

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
