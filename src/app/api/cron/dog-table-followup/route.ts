import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getResend } from '@/lib/email';

export const runtime = 'nodejs';

const DOG_SLUG = 'the-dog-at-the-kings-table';
const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://deadhidden.org';

function authorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

function buildFollowupHtml() {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#050505;font-family:Georgia,'Times New Roman',serif;color:#f5f0e8;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;border:1px solid #222;background:#0b0b0b;">
            <tr>
              <td style="padding:36px 28px;">
                <p style="color:#8b0000;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;margin:0 0 18px;">THE MORNING AFTER</p>
                <h1 style="font-size:30px;line-height:1.1;margin:0 0 20px;color:#f5f0e8;font-weight:400;letter-spacing:-1px;">Do not let the dog stay under the table.</h1>
                <p style="font-size:16px;line-height:1.7;color:#c8c0b3;margin:0 0 18px;">Yesterday you bought <strong>The Dog At The King's Table</strong>.</p>
                <p style="font-size:16px;line-height:1.7;color:#c8c0b3;margin:0 0 18px;">The danger is not that you waste the seven mornings.</p>
                <p style="font-size:16px;line-height:1.7;color:#c8c0b3;margin:0 0 18px;">The danger is that you feel something wake up, then go back to the same dead routine.</p>
                <p style="font-size:16px;line-height:1.7;color:#c8c0b3;margin:0 0 26px;">If you want the next weapon, get the Essential Arsenal. Ten core guides. Built for men rebuilding the table, the house, and the soul.</p>
                <a href="${BASE_URL}/store/essential-arsenal" style="display:inline-block;background:#8b0000;color:#fff;text-decoration:none;font-size:12px;letter-spacing:2px;font-weight:700;text-transform:uppercase;padding:15px 24px;">GET THE ESSENTIAL ARSENAL</a>
                <p style="font-size:13px;line-height:1.6;color:#666;margin:28px 0 0;">If you lost the download email, reply here and I will fix it.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stripe = getStripe();
  const resend = getResend();
  const now = Math.floor(Date.now() / 1000);
  const gte = now - 60 * 60 * 48;
  const lte = now - 60 * 60 * 20;

  const sessions = await stripe.checkout.sessions.list({
    limit: 100,
    created: { gte, lte },
  });

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const session of sessions.data) {
    const slug = session.metadata?.productSlug || session.metadata?.slug;
    const alreadySent = session.metadata?.dogFollowupSent === 'true';
    const email = session.customer_details?.email || session.customer_email || undefined;

    if (slug !== DOG_SLUG || alreadySent || session.payment_status !== 'paid' || !email) {
      skipped += 1;
      continue;
    }

    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Dead Hidden <noreply@deadhidden.org>',
        to: email,
        subject: 'Do not let the dog stay under the table.',
        html: buildFollowupHtml(),
        text: [
          'Do not let the dog stay under the table.',
          '',
          "Yesterday you bought The Dog At The King's Table.",
          '',
          'The danger is not that you waste the seven mornings.',
          'The danger is that you feel something wake up, then go back to the same dead routine.',
          '',
          `Next weapon: ${BASE_URL}/store/essential-arsenal`,
        ].join('\n'),
      });

      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          ...(session.metadata || {}),
          dogFollowupSent: 'true',
          dogFollowupSentAt: new Date().toISOString(),
        },
      });

      sent += 1;
    } catch (error) {
      errors.push(`${session.id}: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  }

  return NextResponse.json({ sent, skipped, errors });
}
