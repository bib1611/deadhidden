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
