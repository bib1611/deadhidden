import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not defined');
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// ─── Welcome Email ─────────────────────────────────────────────
// Sent immediately on signup. 60-80% open rate window.
// One CTA: best-selling product (How to Study the Bible).

export async function sendWelcomeEmail(email: string, source?: string) {
  const resend = getResend();
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://deadhidden.org';
  const fromAddress = process.env.EMAIL_FROM || 'Dead Hidden <noreply@deadhidden.org>';

  await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: "You're in — here's where to start",
    html: buildWelcomeEmailHtml(baseUrl),
  });

  console.log('Welcome email sent to:', email, source ? `(source: ${source})` : '');
}

function buildWelcomeEmailHtml(baseUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Dead Hidden</title>
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img
                src="${baseUrl}/images/logo.png"
                alt="Dead Hidden"
                width="80"
                style="width:80px; height:auto;"
              />
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <h1 style="color:#e8e0d0; font-size:28px; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin:0; font-family:Georgia,'Times New Roman',serif;">
                YOU'RE IN.
              </h1>
            </td>
          </tr>

          <!-- Red line -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <div style="width:60px; height:3px; background-color:#8b0000;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:16px;">
              <p style="color:#e8e0d0; font-size:16px; line-height:1.7; margin:0;">
                Dead Hidden is a Bible study ministry built in the trenches &mdash; not a classroom. We serve churches, families, and every Christian who knows the modern church is missing something.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:24px;">
              <p style="color:#888888; font-size:16px; line-height:1.7; margin:0;">
                Here's what you're getting:
              </p>
              <ul style="color:#888888; font-size:15px; line-height:1.8; padding-left:20px; margin:12px 0 0 0;">
                <li style="margin-bottom:6px;">Biblical truth that doesn't bend to culture</li>
                <li style="margin-bottom:6px;">Resources on marriage, parenting, and spiritual warfare</li>
                <li style="margin-bottom:6px;">Early access to new guides before they go public</li>
              </ul>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px; background-color:#222222;"></div>
            </td>
          </tr>

          <!-- CTA Block: Best-selling product -->
          <tr>
            <td style="padding-bottom:8px;">
              <p style="color:#8b0000; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0;">
                START HERE
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:8px;">
              <p style="color:#e8e0d0; font-size:20px; font-weight:700; margin:0; font-family:Georgia,'Times New Roman',serif;">
                How to Study the Bible Like Your Life Depends on It
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:20px;">
              <p style="color:#888888; font-size:14px; line-height:1.6; margin:0;">
                318 believers already use this system. Four phases. One KJV. The study method the modern church forgot to teach you. <strong style="color:#e8e0d0;">$7.</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <a
                href="${baseUrl}/store/how-to-study-bible"
                style="display:inline-block; background-color:#8b0000; color:#e8e0d0; text-decoration:none; font-size:14px; font-weight:700; letter-spacing:2px; padding:14px 32px; text-transform:uppercase; font-family:Georgia,'Times New Roman',serif;"
              >
                GET THE STUDY SYSTEM &rarr;
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px; background-color:#222222;"></div>
            </td>
          </tr>

          <!-- Free resources nudge -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="color:#555555; font-size:14px; line-height:1.6; margin:0;">
                Not ready to buy? No pressure. We've got <a href="${baseUrl}/store?category=free-resources" style="color:#8b0000; text-decoration:underline;">free downloads</a> too. Start wherever you are.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="color:#444444; font-size:12px; line-height:1.5; margin:0;">
                Questions? Hit reply. We read every email.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center">
              <p style="color:#333333; font-size:11px; margin:0;">
                Dead Hidden Ministries &mdash; <a href="${baseUrl}" style="color:#555555; text-decoration:none;">deadhidden.org</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}


// ─── Lead Magnet Delivery Email ────────────────────────────────
// Sent when signup includes a leadMagnet (e.g., "submission-fraud").
// Delivers the promised free resource + CTA to best seller.

export async function sendLeadMagnetEmail(
  email: string,
  leadMagnet: string,
  source?: string
) {
  const resend = getResend();
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://deadhidden.org';
  const fromAddress = process.env.EMAIL_FROM || 'Dead Hidden <noreply@deadhidden.org>';

  const magnet = LEAD_MAGNETS[leadMagnet];
  if (!magnet) {
    // Unknown lead magnet — fall back to generic welcome
    console.warn('Unknown lead magnet:', leadMagnet, '— sending welcome email instead');
    return sendWelcomeEmail(email, source);
  }

  await resend.emails.send({
    from: fromAddress,
    to: email,
    subject: magnet.subject,
    html: buildLeadMagnetEmailHtml(baseUrl, magnet),
  });

  console.log('Lead magnet email sent to:', email, `(magnet: ${leadMagnet}, source: ${source || 'unknown'})`);
}

interface LeadMagnetConfig {
  subject: string;
  headline: string;
  description: string;
  downloadSlug: string;
  downloadLabel: string;
}

const LEAD_MAGNETS: Record<string, LeadMagnetConfig> = {
  'submission-fraud': {
    subject: "Your free PDF — The Submission Fraud",
    headline: "THE SUBMISSION FRAUD",
    description: "The most misunderstood word in the Bible, decoded. 195 believers already grabbed this. Now it's yours.",
    downloadSlug: 'submission-fraud',
    downloadLabel: 'DOWNLOAD THE PDF',
  },
};

function buildLeadMagnetEmailHtml(baseUrl: string, magnet: LeadMagnetConfig): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${magnet.headline}</title>
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img
                src="${baseUrl}/images/logo.png"
                alt="Dead Hidden"
                width="80"
                style="width:80px; height:auto;"
              />
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <h1 style="color:#e8e0d0; font-size:28px; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin:0; font-family:Georgia,'Times New Roman',serif;">
                HERE'S YOUR FREE PDF.
              </h1>
            </td>
          </tr>

          <!-- Red line -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <div style="width:60px; height:3px; background-color:#8b0000;"></div>
            </td>
          </tr>

          <!-- Resource name -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <p style="color:#e8e0d0; font-size:18px; font-weight:700; margin:0; font-family:Georgia,'Times New Roman',serif;">
                ${magnet.headline}
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="color:#888888; font-size:15px; line-height:1.6; margin:0; max-width:400px;">
                ${magnet.description}
              </p>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <a
                href="${baseUrl}/store/${magnet.downloadSlug}"
                style="display:inline-block; background-color:#8b0000; color:#e8e0d0; text-decoration:none; font-size:14px; font-weight:700; letter-spacing:2px; padding:16px 40px; text-transform:uppercase; font-family:Georgia,'Times New Roman',serif;"
              >
                ${magnet.downloadLabel}
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px; background-color:#222222;"></div>
            </td>
          </tr>

          <!-- Upsell: Best seller -->
          <tr>
            <td style="padding-bottom:8px;">
              <p style="color:#8b0000; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0;">
                WHILE YOU'RE HERE
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:8px;">
              <p style="color:#e8e0d0; font-size:18px; font-weight:700; margin:0; font-family:Georgia,'Times New Roman',serif;">
                How to Study the Bible Like Your Life Depends on It
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:20px;">
              <p style="color:#888888; font-size:14px; line-height:1.6; margin:0;">
                318 believers use this 4-phase KJV study system. <strong style="color:#e8e0d0;">$7.</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <a
                href="${baseUrl}/store/how-to-study-bible"
                style="display:inline-block; border:1px solid #8b0000; color:#8b0000; text-decoration:none; font-size:13px; font-weight:700; letter-spacing:2px; padding:12px 28px; text-transform:uppercase; font-family:Georgia,'Times New Roman',serif;"
              >
                GET THE STUDY SYSTEM &rarr;
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px; background-color:#222222;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="color:#444444; font-size:12px; line-height:1.5; margin:0;">
                Questions? Hit reply. We read every email.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center">
              <p style="color:#333333; font-size:11px; margin:0;">
                Dead Hidden Ministries &mdash; <a href="${baseUrl}" style="color:#555555; text-decoration:none;">deadhidden.org</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}


// ─── Purchase Email ────────────────────────────────────────────

interface PurchaseEmailParams {
  customerEmail: string;
  productName: string;
  productSlug: string;
  isVault: boolean;
  downloadUrl: string;
  amountPaid: number; // in cents
}

/**
 * Send the purchase confirmation + download link email.
 * One email. No fluff. Here's what you bought, here's how to get it.
 */
export async function sendPurchaseEmail(params: PurchaseEmailParams) {
  const resend = getResend();
  const { customerEmail, productName, isVault, downloadUrl, amountPaid } = params;

  const amountFormatted = `$${(amountPaid / 100).toFixed(2)}`;
  const subject = isVault
    ? 'The Vault Is Open — Your Downloads Are Ready'
    : `${productName} — Your Download Is Ready`;

  const html = buildPurchaseEmailHtml({
    productName,
    isVault,
    downloadUrl,
    amountFormatted,
  });

  const fromAddress = process.env.EMAIL_FROM || 'Dead Hidden <noreply@deadhidden.org>';

  await resend.emails.send({
    from: fromAddress,
    to: customerEmail,
    subject,
    html,
  });
}

function buildPurchaseEmailHtml(params: {
  productName: string;
  isVault: boolean;
  downloadUrl: string;
  amountFormatted: string;
}): string {
  const { productName, isVault, downloadUrl, amountFormatted } = params;

  const headline = isVault ? 'THE VAULT IS OPEN.' : "IT'S YOURS.";
  const description = isVault
    ? 'Every guide, manual, protocol, and framework. All of it. Yours.'
    : `<strong>${productName}</strong> is ready for download.`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headline}</title>
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img
                src="${process.env.NEXT_PUBLIC_URL || 'https://deadhidden.org'}/images/logo.png"
                alt="Dead Hidden"
                width="80"
                style="width:80px; height:auto;"
              />
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <h1 style="color:#e8e0d0; font-size:32px; font-weight:700; letter-spacing:3px; text-transform:uppercase; margin:0; font-family:Georgia,'Times New Roman',serif;">
                ${headline}
              </h1>
            </td>
          </tr>

          <!-- Red line -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <div style="width:60px; height:3px; background-color:#8b0000;"></div>
            </td>
          </tr>

          <!-- Description -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="color:#888888; font-size:16px; line-height:1.6; margin:0;">
                ${description}
              </p>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <a
                href="${downloadUrl}"
                style="display:inline-block; background-color:#8b0000; color:#e8e0d0; text-decoration:none; font-size:16px; font-weight:700; letter-spacing:2px; padding:16px 40px; text-transform:uppercase; font-family:Georgia,'Times New Roman',serif;"
              >
                ${isVault ? 'OPEN THE VAULT' : 'DOWNLOAD NOW'}
              </a>
            </td>
          </tr>

          <!-- Bookmark note -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <p style="color:#555555; font-size:13px; line-height:1.5; margin:0;">
                Download now &mdash; your link expires in 7 days. Reply to this email if you need a fresh link.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px; background-color:#222222;"></div>
            </td>
          </tr>

          <!-- Receipt -->
          <tr>
            <td style="padding-bottom:24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#555555; font-size:13px; font-family:Georgia,'Times New Roman',serif;">
                    <strong style="color:#888888; text-transform:uppercase; letter-spacing:1px; font-size:11px;">Receipt</strong><br><br>
                    <span style="color:#e8e0d0;">${productName}</span><br>
                    <span style="color:#8b0000; font-weight:700;">${amountFormatted}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px; background-color:#222222;"></div>
            </td>
          </tr>

          <!-- Resend downloads -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <p style="margin:16px 0 0;color:#888;font-size:13px;">Lost this email or need to re-download? Go to <a href="https://deadhidden.org/resend-downloads" style="color:#cc2200;">deadhidden.org/resend-downloads</a> — enter your email and your files will be resent instantly.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="color:#444444; font-size:12px; line-height:1.5; margin:0;">
                Questions? Reply to this email or contact<br>
                <a href="mailto:thebiblicalman1611@gmail.com" style="color:#8b0000; text-decoration:underline;">thebiblicalman1611@gmail.com</a>
              </p>
            </td>
          </tr>

          <tr>
            <td align="center">
              <p style="color:#333333; font-size:11px; margin:0;">
                Dead Hidden &mdash; deadhidden.org
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
