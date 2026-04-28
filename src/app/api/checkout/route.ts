import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { products } from '@/data/products';

export const runtime = 'nodejs';

type CheckoutRequestBody = {
  productSlug: string;
  email?: string;
};

const deadHiddenProProduct = {
  slug: 'dead-hidden-pro',
  name: 'DEAD HIDDEN PRO',
  tagline:
    '$29/month. One guide token every month. The paid Substack tier. Cancel anytime.',
  priceCents: 2900,
};

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequestBody = await request.json();
    const { productSlug, email } = body;

    if (!productSlug) {
      return NextResponse.json(
        { error: 'productSlug is required' },
        { status: 400 }
      );
    }

    // Look up product from products data. Dead Hidden Pro lives at /pro and is
    // intentionally handled here so checkout can launch without touching the
    // main store catalog.
    const product =
      productSlug === deadHiddenProProduct.slug
        ? deadHiddenProProduct
        : products.find((p) => p.slug === productSlug);

    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${productSlug}` },
        { status: 404 }
      );
    }

    // If free product, return download redirect URL
    if ('isFree' in product && product.isFree) {
      return NextResponse.json({
        url: `/store/${product.slug}/download`,
        isFree: true,
      });
    }

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_URL) {
      throw new Error('NEXT_PUBLIC_URL environment variable is not defined');
    }

    // Determine checkout mode — Dead Hidden Pro and legacy "the-table" are
    // subscriptions. Everything else is a one-time payment.
    const mode: 'payment' | 'subscription' =
      product.slug === deadHiddenProProduct.slug || product.slug === 'the-table'
        ? 'subscription'
        : 'payment';

    // Create Stripe Checkout Session
    const stripe = getStripe();
    const coverImage =
      'coverImage' in product && typeof product.coverImage === 'string'
        ? product.coverImage
        : undefined;

    const session = await stripe.checkout.sessions.create({
      mode,
      customer_creation: mode === 'subscription' ? undefined : 'always',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.tagline,
              ...(coverImage ? { images: [coverImage] } : {}),
            },
            unit_amount: product.priceCents,
            recurring: mode === 'subscription'
              ? { interval: 'month' }
              : undefined,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/store/${productSlug}`,
      metadata: {
        productSlug,
        slug: productSlug,
        productName: product.name,
      },
      ...(email && { customer_email: email }),
    });

    if (!session.url) {
      throw new Error('Failed to create checkout session');
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
