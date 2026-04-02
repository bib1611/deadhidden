import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { products } from '@/data/products';

export const runtime = 'nodejs';

/**
 * Download API — verifies Stripe checkout session and returns download URLs.
 * No database needed. Stripe IS the database.
 *
 * GET /api/download?session_id=cs_live_xxx
 *
 * Returns: { product, files: [{ name, url }] } or { error }
 */
export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      );
    }

    // Verify the checkout session with Stripe
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check payment status
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 403 }
      );
    }

    // Get the product slug from session metadata
    const productSlug = session.metadata?.productSlug;
    if (!productSlug) {
      return NextResponse.json(
        { error: 'Product not found in session' },
        { status: 404 }
      );
    }

    // Find the product
    const product = products.find((p) => p.slug === productSlug);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get the file URLs for this product
    const fileBaseUrl = process.env.FILE_STORAGE_URL || '';

    // For the Vault, return ALL product files
    const isVault = productSlug === 'the-vault' || productSlug === 'thanksgiving-marriage-vault';
    const isEssentialArsenal = productSlug === 'essential-arsenal';
    const isWomanhoodBundle = productSlug === 'biblical-womanhood-bundle';

    // Essential Arsenal includes these 10 core products
    const essentialArsenalSlugs = new Set([
      'kings-marriage-manual-red',
      'caged-porn',
      'how-to-study-bible',
      'before-the-world-does',
      'exposing-the-enemy',
      'when-she-stopped-asking',
      'darkest-proverbs',
      'fourth-answer',
      'kings-conquest',
      'absalom-protocol',
    ]);

    // Biblical Womanhood Bundle includes all 8 of Christie's products
    const womanhoodBundleSlugs = new Set([
      'villains-valiant-virtuous',
      'scriptural-prayers',
      '31-days-in-proverbs',
      'titus-2-older-womans-calling',
      'seasons-blur',
      'before-the-world-does-student-workbook',
      'walking-together-devotional',
      'biblical-womanhood-2026-reading-plan',
    ]);

    let files: Array<{ name: string; filename: string; slug: string }>;

    if (isVault) {
      // Vault buyers get everything
      files = products
        .filter((p) => !p.isFree && p.slug !== 'the-vault' && p.slug !== 'thanksgiving-marriage-vault' && p.slug !== 'the-table' && p.slug !== 'vault-sampler' && p.slug !== 'essential-arsenal')
        .map((p) => ({
          name: p.name,
          filename: `${p.slug}.pdf`,
          slug: p.slug,
        }));
    } else if (isEssentialArsenal) {
      // Essential Arsenal buyers get the 10 curated products
      files = products
        .filter((p) => essentialArsenalSlugs.has(p.slug))
        .map((p) => ({
          name: p.name,
          filename: `${p.slug}.pdf`,
          slug: p.slug,
        }));
    } else if (isWomanhoodBundle) {
      // Womanhood Bundle buyers get all 8 of Christie's products
      files = products
        .filter((p) => womanhoodBundleSlugs.has(p.slug))
        .map((p) => ({
          name: p.name,
          filename: `${p.slug}.pdf`,
          slug: p.slug,
        }));
    } else {
      files = [
        {
          name: product.name,
          filename: `${product.slug}.pdf`,
          slug: product.slug,
        },
      ];
    }

    // Generate download URLs through the serve API (handles blob URL lookup + auth)
    const downloadFiles = files.map((f) => ({
      name: f.name,
      url: `/api/serve/${f.slug}?session_id=${sessionId}`,
    }));

    return NextResponse.json({
      product: {
        name: product.name,
        slug: product.slug,
      },
      customerEmail: session.customer_email || session.customer_details?.email,
      isVault,
      files: downloadFiles,
    });
  } catch (error) {
    console.error('Download verification error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    // If Stripe can't find the session
    if (errorMessage.includes('No such checkout.session')) {
      return NextResponse.json(
        { error: 'Invalid session. This download link may have expired.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
