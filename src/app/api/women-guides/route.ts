import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/email';

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || '853ea354-ef8b-4781-86cd-1b1032ad247e';

const GUIDE_1_URL = 'https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/womens-guide-01-idol-of-expectation-kXgGarpLSfSA6fIgawDCEQz8RVfwLm.pdf';
const GUIDE_2_URL = 'https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/womens-guide-02-subtle-takeover-FTp4uX1F5GVL68jd7IlVuqXmBhQ5gi.pdf';
const GUIDE_3_URL = 'https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/womens-guide-03-performing-for-pew-Pp5oBQZnHz7wGsI5y14ete6WgFguw1.pdf';

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
        firstName: 'women_guide_signup',
      });
    } catch (createError) {
      const msg = createError instanceof Error ? createError.message : '';
      if (!msg.includes('already exists') && !msg.includes('409')) {
        throw createError;
      }
    }

    // 2. Send all three guides in one email
    await resend.emails.send({
      from: 'Dead Hidden <noreply@thebiblicalmantruth.com>',
      to: email,
      subject: 'Your 3 Guides — The Wounds Nobody Will Say Out Loud',
      html: buildWomensGuideEmail(),
    });

    console.log('Women guide email sent to:', email, `| ${new Date().toISOString()}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Women guides error:', error);

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

function buildWomensGuideEmail(): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your 3 Guides</title>
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

          <!-- Headline -->
          <tr>
            <td style="padding-bottom:8px;">
              <h1 style="color:#e8e0d0; font-size:24px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0; font-family:Georgia,'Times New Roman',serif;">
                YOU DID EVERYTHING RIGHT.
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:24px;">
              <p style="color:#888888; font-size:16px; line-height:1.7; margin:0;">
                Three guides. Three wounds nobody in your small group will say out loud.
              </p>
            </td>
          </tr>

          <!-- Guide 1 -->
          <tr>
            <td style="padding-bottom:8px;">
              <p style="color:#8b0000; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0;">
                GUIDE 1
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:4px;">
              <p style="color:#e8e0d0; font-size:18px; font-weight:700; margin:0;">
                The Idol of Expectation
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:16px;">
              <p style="color:#888888; font-size:14px; font-style:italic; line-height:1.5; margin:0;">
                You did everything right. God didn&rsquo;t deliver what you were told He would.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <a
                href="${GUIDE_1_URL}"
                style="display:inline-block; background-color:#8b0000; color:#e8e0d0; text-decoration:none; font-size:13px; font-weight:700; letter-spacing:2px; padding:14px 32px; text-transform:uppercase; font-family:Georgia,'Times New Roman',serif;"
              >
                DOWNLOAD GUIDE 1
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px; background-color:#222222;"></div>
            </td>
          </tr>

          <!-- Guide 2 -->
          <tr>
            <td style="padding-bottom:8px;">
              <p style="color:#8b0000; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0;">
                GUIDE 2
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:4px;">
              <p style="color:#e8e0d0; font-size:18px; font-weight:700; margin:0;">
                The Subtle Takeover
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:16px;">
              <p style="color:#888888; font-size:14px; font-style:italic; line-height:1.5; margin:0;">
                She didn&rsquo;t want to lead. She just didn&rsquo;t have a choice. Or so she told herself.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <a
                href="${GUIDE_2_URL}"
                style="display:inline-block; background-color:#8b0000; color:#e8e0d0; text-decoration:none; font-size:13px; font-weight:700; letter-spacing:2px; padding:14px 32px; text-transform:uppercase; font-family:Georgia,'Times New Roman',serif;"
              >
                DOWNLOAD GUIDE 2
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding-bottom:24px;">
              <div style="height:1px; background-color:#222222;"></div>
            </td>
          </tr>

          <!-- Guide 3 -->
          <tr>
            <td style="padding-bottom:8px;">
              <p style="color:#8b0000; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin:0;">
                GUIDE 3
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:4px;">
              <p style="color:#e8e0d0; font-size:18px; font-weight:700; margin:0;">
                Performing for the Pew
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:16px;">
              <p style="color:#888888; font-size:14px; font-style:italic; line-height:1.5; margin:0;">
                Her whole spiritual life has an audience. She is so tired.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <a
                href="${GUIDE_3_URL}"
                style="display:inline-block; background-color:#8b0000; color:#e8e0d0; text-decoration:none; font-size:13px; font-weight:700; letter-spacing:2px; padding:14px 32px; text-transform:uppercase; font-family:Georgia,'Times New Roman',serif;"
              >
                DOWNLOAD GUIDE 3
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
                More at <a href="https://deadhidden.org/for-women" style="color:#8b0000; text-decoration:none;">deadhidden.org</a>
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
