import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getBlobUrl } from '@/lib/blob';
import { products } from '@/data/products';

export const runtime = 'nodejs';

/**
 * Serve a PDF file after verifying Stripe session.
 * GET /api/serve/[slug]?session_id=cs_live_xxx
 *
 * Checks:
 * 1. Valid Stripe session ID
 * 2. Payment completed
 * 3. Product matches session metadata (or buyer purchased the Vault)
 *
 * Then redirects to the actual file URL in Vercel Blob.
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

    const purchasedSlug = session.metadata?.productSlug;
    if (!purchasedSlug) {
      return new NextResponse('Invalid session', { status: 403 });
    }

    // Check authorization: buyer must have purchased this specific product, the Vault, or Essential Arsenal (for its 10 products)
    const isVaultPurchase =
      purchasedSlug === 'the-vault' ||
      purchasedSlug === 'thanksgiving-marriage-vault';
    const isDirectPurchase = purchasedSlug === slug;

    const essentialArsenalSlugs = new Set([
      'kings-marriage-manual-red', 'caged-porn', 'how-to-study-bible',
      'before-the-world-does', 'exposing-the-enemy', 'when-she-stopped-asking',
      'darkest-proverbs', 'fourth-answer', 'kings-conquest', 'absalom-protocol',
    ]);
    const isEssentialArsenalPurchase =
      purchasedSlug === 'essential-arsenal' && essentialArsenalSlugs.has(slug);

    const womanhoodBundleSlugs = new Set([
      'villains-valiant-virtuous', 'scriptural-prayers', '31-days-in-proverbs',
      'titus-2-older-womans-calling', 'seasons-blur', 'before-the-world-does-student-workbook',
      'walking-together-devotional', 'biblical-womanhood-2026-reading-plan',
    ]);
    const isWomanhoodBundlePurchase =
      purchasedSlug === 'biblical-womanhood-bundle' && womanhoodBundleSlugs.has(slug);

    if (!isVaultPurchase && !isDirectPurchase && !isEssentialArsenalPurchase && !isWomanhoodBundlePurchase) {
      return new NextResponse('Not authorized for this file', { status: 403 });
    }

    // Verify the product exists
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // Look up the actual blob URL (handles hash suffixes)
    const fileUrl = await getBlobUrl(slug);

    if (!fileUrl) {
      return new NextResponse(
        'File not available yet. Contact thebiblicalman1611@gmail.com for help.',
        { status: 503 }
      );
    }

    // Redirect to the actual blob URL
    return NextResponse.redirect(fileUrl);
  } catch (error) {
    console.error('File serve error:', error);
    return new NextResponse(
      'Download failed. Please try again or contact support.',
      { status: 500 }
    );
  }
}
