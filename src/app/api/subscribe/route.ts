import { NextRequest, NextResponse } from 'next/server';
import { getResend } from '@/lib/email';

const AUDIENCE_ID = '853ea354-ef8b-4781-86cd-1b1032ad247e';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const resend = getResend();

    // Add contact to Dead Hidden audience
    await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: false,
    });

    console.log('New subscriber added:', email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);

    // Resend returns 409 if contact already exists — treat as success
    const message =
      error instanceof Error ? error.message : 'Unknown error';
    if (message.includes('already exists') || message.includes('409')) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Try again.' },
      { status: 500 }
    );
  }
}
