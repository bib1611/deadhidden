import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getBlobUrl } from '@/lib/blob';
import { products } from '@/data/products';
import { getMultiPartParent, MULTI_PART_PRODUCTS } from '@/lib/multi-part';

export const runtime = 'nodejs';

// Download links expire after 7 days — prevents permanent link sharing
const MAX_SESSION_AGE_DAYS = 7;
const STATIC_PRODUCT_FILES: Record<string, string> = {
  'wars-and-rumors-of-wars': '/product-files/wars-and-rumors-of-wars.pdf',
  'the-dog-at-the-kings-table': '/product-files/the-dog-at-the-kings-table.pdf',
};

/**
 * Serve a PDF file after verifying Stripe session.
 * GET /api/serve/[slug]?session_id=cs_live_xxx
 *
 * Checks:
 * 1. Valid Stripe session ID
 * 2. Payment completed
 * 3. Session is not older than MAX_SESSION_AGE_DAYS
 * 4. Product matches session metadata (or buyer purchased the Vault)
 *
 * Proxies the file through the API so blob URLs are never exposed to the browser.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return new NextResponse('Missing session_id', { status: 400 });
    }

    // Verify with Stripe
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return new NextResponse('Payment not completed', { status: 403 });
    }

    // Check session age — reject sessions older than 7 days
    const sessionCreatedAt = new Date(session.created * 1000);
    const now = new Date();
    const daysSinceCreation = (now.getTime() - sessionCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceCreation > MAX_SESSION_AGE_DAYS) {
      return new NextResponse(
        'Download link expired. Contact thebiblicalman1611@gmail.com for a fresh link.',
        { status: 410 }
      );
    }

    const purchasedSlug = session.metadata?.productSlug;
    if (!purchasedSlug) {
      return new NextResponse('Invalid session', { status: 403 });
    }

    // Check authorization: buyer must have purchased this specific product, the Vault, or a bundle containing it
    const isVaultPurchase =
      purchasedSlug === 'the-vault' ||
      purchasedSlug === 'thanksgiving-marriage-vault';
    const isDirectPurchase = purchasedSlug === slug;

    // Multi-part: if slug is a part (e.g. "loneliness-lie-part-1"),
    // check if the parent product (e.g. "loneliness-lie") was purchased
    const multiPartParent = getMultiPartParent(slug);
    const isMultiPartPurchase = multiPartParent !== null && purchasedSlug === multiPartParent;

    const essentialArsenalSlugs = new Set([
      'kings-marriage-manual-red', 'caged-porn', 'how-to-study-bible',
      'before-the-world-does', 'exposing-the-enemy', 'when-she-stopped-asking',
      'darkest-proverbs', 'fourth-answer', 'kings-conquest', 'absalom-protocol',
    ]);
    const isEssentialArsenalPurchase =
      purchasedSlug === 'essential-arsenal' && essentialArsenalSlugs.has(slug);

    const vaultSamplerSlugs = new Set([
      'warriors-bible-conquest', 'kings-marriage-manual-red',
      'break-free-modern-demons', 'warriors-bible-blueprint',
    ]);
    const isVaultSamplerPurchase =
      purchasedSlug === 'vault-sampler' && vaultSamplerSlugs.has(slug);

    const womanhoodBundleSlugs = new Set([
      'villains-valiant-virtuous', 'scriptural-prayers', '31-days-in-proverbs',
      'titus-2-older-womans-calling', 'seasons-blur', 'before-the-world-does-student-workbook',
      'walking-together-devotional', 'biblical-womanhood-2026-reading-plan',
    ]);
    const isWomanhoodBundlePurchase =
      purchasedSlug === 'biblical-womanhood-bundle' && womanhoodBundleSlugs.has(slug);

    if (!isVaultPurchase && !isDirectPurchase && !isMultiPartPurchase && !isEssentialArsenalPurchase && !isVaultSamplerPurchase && !isWomanhoodBundlePurchase) {
      return new NextResponse('Not authorized for this file', { status: 403 });
    }

    // Verify the product exists (part slugs won't be in products array, so also check multi-part mappings)
    const product = products.find((p) => p.slug === slug);
    const isMultiPartFile = multiPartParent !== null;
    if (!product && !isMultiPartFile) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // Look up the actual blob URL (handles hash suffixes)
    let fileUrl = await getBlobUrl(slug);

    if (!fileUrl && STATIC_PRODUCT_FILES[slug]) {
      fileUrl = new URL(STATIC_PRODUCT_FILES[slug], request.nextUrl.origin).toString();
    }

    if (!fileUrl) {
      return new NextResponse(
        'File not available yet. Contact thebiblicalman1611@gmail.com for help.',
        { status: 503 }
      );
    }

    // Proxy the file — never expose the blob URL to the browser
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok || !fileResponse.body) {
      return new NextResponse('File download failed', { status: 502 });
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${slug}.pdf"`);
    headers.set('Cache-Control', 'private, no-store, no-cache');
    headers.set('X-Content-Type-Options', 'nosniff');

    // Pass through content length if available
    const contentLength = fileResponse.headers.get('content-length');
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }

    return new NextResponse(fileResponse.body, { headers });
  } catch (error) {
    console.error('File serve error:', error);
    return new NextResponse(
      'Download failed. Please try again or contact support.',
      { status: 500 }
    );
  }
}
