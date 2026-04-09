import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getResend } from '@/lib/email';
import { products } from '@/data/products';
import { MULTI_PART_PRODUCTS } from '@/lib/multi-part';
import { getBlobUrl } from '@/lib/blob';

export const runtime = 'nodejs';

// ─── Rate Limiting ───────────────────────────────────────────
// Max 3 requests per email per hour. In-memory, resets on deploy.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(email);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(email, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// ─── Bundle slug sets (same as success route) ────────────────
const BUNDLE_SLUGS = new Set([
  'the-vault',
  'thanksgiving-marriage-vault',
  'the-table',
  'vault-sampler',
  'essential-arsenal',
  'biblical-womanhood-bundle',
]);

const VAULT_SLUGS = new Set(['the-vault', 'thanksgiving-marriage-vault']);

const ESSENTIAL_ARSENAL_SLUGS = new Set([
  'kings-marriage-manual-red', 'caged-porn', 'how-to-study-bible',
  'before-the-world-does', 'exposing-the-enemy', 'when-she-stopped-asking',
  'darkest-proverbs', 'fourth-answer', 'kings-conquest', 'absalom-protocol',
]);

const VAULT_SAMPLER_SLUGS = new Set([
  'warriors-bible-conquest', 'kings-marriage-manual-red',
  'break-free-modern-demons', 'warriors-bible-blueprint',
]);

const WOMANHOOD_BUNDLE_SLUGS = new Set([
  'villains-valiant-virtuous', 'scriptural-prayers', '31-days-in-proverbs',
  'titus-2-older-womans-calling', 'seasons-blur', 'before-the-world-does-student-workbook',
  'walking-together-devotional', 'biblical-womanhood-2026-reading-plan',
]);

// ─── Expand slug to downloadable files ───────────────────────
function expandSlugToFiles(slug: string): Array<{ name: string; slug: string }> {
  if (VAULT_SLUGS.has(slug)) {
    return products
      .filter((p) => !p.isFree && !BUNDLE_SLUGS.has(p.slug))
      .flatMap((p) => {
        if (MULTI_PART_PRODUCTS[p.slug]) {
          return MULTI_PART_PRODUCTS[p.slug].map((part) => ({
            name: part.name,
            slug: part.slug,
          }));
        }
        return [{ name: p.name, slug: p.slug }];
      });
  }

  if (slug === 'vault-sampler') {
    return products
      .filter((p) => VAULT_SAMPLER_SLUGS.has(p.slug))
      .map((p) => ({ name: p.name, slug: p.slug }));
  }

  if (slug === 'essential-arsenal') {
    return products
      .filter((p) => ESSENTIAL_ARSENAL_SLUGS.has(p.slug))
      .map((p) => ({ name: p.name, slug: p.slug }));
  }

  if (slug === 'biblical-womanhood-bundle') {
    return products
      .filter((p) => WOMANHOOD_BUNDLE_SLUGS.has(p.slug))
      .map((p) => ({ name: p.name, slug: p.slug }));
  }

  if (MULTI_PART_PRODUCTS[slug]) {
    return MULTI_PART_PRODUCTS[slug].map((part) => ({
      name: part.name,
      slug: part.slug,
    }));
  }

  const product = products.find((p) => p.slug === slug);
  if (product) {
    return [{ name: product.name, slug: product.slug }];
  }

  return [];
}

// ─── Main handler ────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'invalid_email' },
        { status: 400 }
      );
    }

    // Rate limit check
    if (isRateLimited(email)) {
      return NextResponse.json(
        { success: false, error: 'rate_limited' },
        { status: 429 }
      );
    }

    const stripe = getStripe();

    // ─── Step 1: Find completed checkout sessions by email ───
    // Try checkout sessions first (has metadata.productSlug)
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      status: 'complete',
    });

    // Filter sessions by customer email
    const matchingSessions = sessions.data.filter((s) => {
      const sessionEmail = (
        s.customer_email ||
        s.customer_details?.email ||
        ''
      ).toLowerCase();
      return sessionEmail === email && s.payment_status === 'paid';
    });

    // Also check via customer objects for older purchases
    if (matchingSessions.length === 0) {
      const customers = await stripe.customers.list({ email, limit: 5 });
      for (const customer of customers.data) {
        const customerSessions = await stripe.checkout.sessions.list({
          customer: customer.id,
          limit: 50,
          status: 'complete',
        });
        for (const s of customerSessions.data) {
          if (
            s.payment_status === 'paid' &&
            !matchingSessions.some((ms) => ms.id === s.id)
          ) {
            matchingSessions.push(s);
          }
        }
      }
    }

    if (matchingSessions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'not_found' },
        { status: 404 }
      );
    }

    // ─── Step 2: Extract product slugs from sessions ─────────
    // Deduplicate by slug — only send each product once
    const purchasedProducts = new Map<
      string,
      { name: string; slug: string; sessionId: string }
    >();

    for (const session of matchingSessions) {
      const slug = session.metadata?.productSlug;
      if (!slug) continue;

      // Skip The Table (subscription, not a download)
      if (slug === 'the-table') continue;

      const product = products.find((p) => p.slug === slug);
      const name =
        session.metadata?.productName || product?.name || slug;

      if (!purchasedProducts.has(slug)) {
        purchasedProducts.set(slug, { name, slug, sessionId: session.id });
      }
    }

    if (purchasedProducts.size === 0) {
      return NextResponse.json(
        { success: false, error: 'not_found' },
        { status: 404 }
      );
    }

    // ─── Step 3: Build download links using blob URLs ────────
    interface ProductDownload {
      productName: string;
      files: Array<{ name: string; url: string }>;
    }

    const downloads: ProductDownload[] = [];

    for (const [, purchase] of purchasedProducts) {
      const files = expandSlugToFiles(purchase.slug);
      const resolvedFiles: Array<{ name: string; url: string }> = [];

      for (const file of files) {
        const blobUrl = await getBlobUrl(file.slug);
        if (blobUrl) {
          resolvedFiles.push({ name: file.name, url: blobUrl });
        }
      }

      if (resolvedFiles.length > 0) {
        downloads.push({
          productName: purchase.name,
          files: resolvedFiles,
        });
      }
    }

    if (downloads.length === 0) {
      return NextResponse.json(
        { success: false, error: 'not_found' },
        { status: 404 }
      );
    }

    // ─── Step 4: Send download email via Resend ──────────────
    const resend = getResend();
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://deadhidden.org';

    const fileListHtml = downloads
      .map(
        (d) => `
          <tr>
            <td style="padding-bottom:24px;">
              <p style="color:#e8e0d0; font-size:18px; font-weight:700; margin:0 0 12px 0; font-family:Georgia,'Times New Roman',serif;">
                ${d.productName}
              </p>
              ${d.files
                .map(
                  (f) => `
                <a
                  href="${f.url}"
                  style="display:inline-block; background-color:#8b0000; color:#e8e0d0; text-decoration:none; font-size:13px; font-weight:700; letter-spacing:1px; padding:10px 24px; text-transform:uppercase; font-family:Georgia,'Times New Roman',serif; margin:0 8px 8px 0;"
                >
                  ${f.name} &rarr;
                </a>`
                )
                .join('\n')}
            </td>
          </tr>`
      )
      .join('\n');

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Dead Hidden Downloads</title>
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
                YOUR DOWNLOADS.
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
                Here are all the files from your Dead Hidden purchases. Click to download.
              </p>
            </td>
          </tr>

          <!-- Product downloads -->
          ${fileListHtml}

          <!-- Divider -->
          <tr>
            <td style="padding:16px 0 24px 0;">
              <div style="height:1px; background-color:#222222;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="color:#444444; font-size:12px; line-height:1.5; margin:0;">
                Questions? Email <a href="mailto:support@deadhidden.org" style="color:#8b0000; text-decoration:underline;">support@deadhidden.org</a>
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

    try {
      await resend.emails.send({
        from: 'Dead Hidden <noreply@thebiblicalmantruth.com>',
        to: email,
        subject: 'Your Dead Hidden downloads',
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Resend download email failed:', emailError);
      return NextResponse.json(
        { success: false, error: 'send_failed' },
        { status: 500 }
      );
    }

    // ─── Step 5: Return success ──────────────────────────────
    console.log(
      'Resend downloads email sent to:',
      email,
      `(${downloads.length} products, ${downloads.reduce((n, d) => n + d.files.length, 0)} files)`
    );

    return NextResponse.json({
      success: true,
      count: downloads.length,
    });
  } catch (error) {
    console.error('Resend downloads error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error' },
      { status: 500 }
    );
  }
}
