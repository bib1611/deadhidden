import { NextRequest, NextResponse } from 'next/server';

// Redirect to the canonical email-signup endpoint.
// This route existed as a duplicate — keeping it alive for any
// external integrations that might point here.
export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(
    new URL('/api/email-signup', req.url).toString(),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
