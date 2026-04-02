import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { amountCents } = await request.json();

    if (!amountCents || amountCents < 100) {
      return NextResponse.json(
        { error: 'Minimum gift is $1' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_URL) {
      throw new Error('NEXT_PUBLIC_URL not configured');
    }

    const stripe = getStripe();
    const dollars = (amountCents / 100).toFixed(2);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Support Dead Hidden',
              description: `One-time gift of $${dollars} to keep the fire lit.`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/support/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/support`,
      metadata: {
        type: 'gift',
        amount: dollars,
      },
      submit_type: 'donate',
    });

    if (!session.url) {
      throw new Error('Failed to create checkout session');
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Support checkout error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
