import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { products } from '@/data/products';

export const runtime = 'nodejs';

// Named Stripe products — use pre-created price IDs instead of price_data
const STRIPE_PRICE_MAP: Record<string, string> = {
  'biblical-man-field-manual': 'price_1TKPZaLN6IypHVMVm3pWCndL',
  'biblical-woman-field-manual': 'price_1TKPZaLN6IypHVMVB1OD6r1G',
  'the-essential-arsenal': 'price_1TKPZaLN6IypHVMVNgBjEJol',
  'household-order-bundle': 'price_1TKiEtLN6IypHVMVNM9edHgZ',
  'counterfeit-kingdom-starter-guide': 'price_1TKiEtLN6IypHVMVEBq4xsPp',
};

type CheckoutRequestBody = {
  productSlug: string;
  email?: string;
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

    // Look up product from products data
    const product = products.find((p) => p.slug === productSlug);

    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${productSlug}` },
        { status: 404 }
      );
    }

    // If free product, return download redirect URL
    if (product.isFree) {
      return NextResponse.json({
        url: `/store/${product.slug}/download`,
        isFree: true,
      });
    }

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_URL) {
      throw new Error('NEXT_PUBLIC_URL environment variable is not defined');
    }

    // Determine checkout mode (subscription for "the-table", payment for everything else)
    const mode: 'payment' | 'subscription' =
      product.slug === 'the-table' ? 'subscription' : 'payment';

    // Create Stripe Checkout Session
    const stripe = getStripe();
    const stripePriceId = STRIPE_PRICE_MAP[product.slug];
    const session = await stripe.checkout.sessions.create({
      mode,
      customer_creation: mode === 'subscription' ? undefined : 'always',
      line_items: [
        stripePriceId
          ? { price: stripePriceId, quantity: 1 }
          : {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: product.name,
                  description: product.tagline,
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
