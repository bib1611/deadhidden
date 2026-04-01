import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
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
 * Then redirects to the actual file URL (Vercel Blob / storage).
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

    // Check authorization: buyer must have purchased this specific product OR the Vault
    const isVaultPurchase = purchasedSlug === 'the-vault' || purchasedSlug === 'thanksgiving-marriage-vault';
    const isDirectPurchase = purchasedSlug === slug;

    if (!isVaultPurchase && !isDirectPurchase) {
      return new NextResponse('Not authorized for this file', { status: 403 });
    }

    // Verify the product exists
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      return new NextResponse('Product not found', { status: 404 });
    }

    // Get the file URL from Vercel Blob or configured storage
    const fileBaseUrl = process.env.FILE_STORAGE_URL;

    if (!fileBaseUrl) {
      return new NextResponse(
        'File storage not configured. Contact support.',
        { status: 503 }
      );
    }

    const fileUrl = `${fileBaseUrl}/${slug}.pdf`;

    // Redirect to the actual file with a Content-Disposition header hint
    // The blob storage URL handles the actual download
    return NextResponse.redirect(fileUrl);
  } catch (error) {
    console.error('File serve error:', error);
    return new NextResponse('Download failed. Please try again or contact support.', {
      status: 500,
    });
  }
}
