import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/email';

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || '853ea354-ef8b-4781-86cd-1b1032ad247e';
const PDF_URL = 'https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/three-alibis-lead-magnet-DLwXc6A6Sdgg5bxDAmHc9NZS8BRCpe.pdf';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const resend = getResend();

    // 1. Add contact to Resend audience
    try {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
        firstName: 'three_alibis_lead_magnet',
      });
    } catch (createError) {
      const msg = createError instanceof Error ? createError.message : '';
      if (!msg.includes('already exists') && !msg.includes('409')) {
        throw createError;
      }
    }

    // 2. Send the PDF delivery email
    await resend.emails.send({
      from: 'Dead Hidden <noreply@thebiblicalmantruth.com>',
      to: email,
      subject: 'Your free PDF is here',
      html: buildThreeAlibisEmail(PDF_URL),
    });

    console.log('Three Alibis lead magnet sent to:', email, `| ${new Date().toISOString()}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead magnet error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';
    if (message.includes('already exists') || message.includes('409')) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Failed to send. Try again.' },
      { status: 500 }
    );
  }
}

function buildThreeAlibisEmail(pdfUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Three Alibis</title>
</head>
<body style="margin:0; padding:0; background-color:#0a0a0a; font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

          <!-- Red line -->
          <tr>
            <td style="padding-bottom:32px;">
              <div style="width:60px; height:3px; background-color:#8b0000;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding-bottom:24px;">
              <p style="color:#e8e0d0; font-size:18px; line-height:1.7; margin:0; font-family:Georgia,'Times New Roman',serif;">
                You asked for The Three Alibis. Here it is.
              </p>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td style="padding-bottom:40px;">
              <a
                href="${pdfUrl}"
                style="display:inline-block; background-color:#8b0000; color:#e8e0d0; text-decoration:none; font-size:14px; font-weight:700; letter-spacing:2px; padding:16px 40px; text-transform:uppercase; font-family:Georgia,'Times New Roman',serif;"
              >
                DOWNLOAD THE PDF
              </a>
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
            <td>
              <p style="margin:16px 0 0;color:#888;font-size:13px;">Lost this email or need to re-download? Go to <a href="https://deadhidden.org/resend-downloads" style="color:#cc2200;">deadhidden.org/resend-downloads</a> — enter your email and your files will be resent instantly.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td>
              <p style="color:#555555; font-size:13px; line-height:1.5; margin:0;">
                More at <a href="https://deadhidden.org" style="color:#8b0000; text-decoration:none;">deadhidden.org</a>
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
