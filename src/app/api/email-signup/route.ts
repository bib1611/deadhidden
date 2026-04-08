import { NextRequest, NextResponse } from 'next/server';
import { getResend, sendWelcomeEmail, sendLeadMagnetEmail } from '@/lib/email';

const AUDIENCE_ID = '853ea354-ef8b-4781-86cd-1b1032ad247e';

export async function POST(req: NextRequest) {
  try {
    const { email, source, leadMagnet } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const resend = getResend();

    // 1. Add contact to Resend audience with source tracking
    let isNewContact = true;
    try {
      await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
        // Store source and lead magnet in firstName field as metadata
        // (Resend contacts don't have custom fields yet, so we use firstName)
        firstName: source || undefined,
      });
    } catch (createError) {
      const msg = createError instanceof Error ? createError.message : '';
      if (msg.includes('already exists') || msg.includes('409')) {
        // Existing contact — still send lead magnet if requested, skip welcome
        isNewContact = false;
      } else {
        throw createError;
      }
    }

    // 2. Send the appropriate email
    // Lead magnet delivery takes priority (they were promised something specific)
    // Welcome email for everyone else
    try {
      if (leadMagnet) {
        await sendLeadMagnetEmail(email, leadMagnet, source);
      } else if (isNewContact) {
        await sendWelcomeEmail(email, source);
      }
      // Existing contacts without lead magnet get nothing (they already got welcome)
    } catch (emailError) {
      // Log but don't fail — the contact was still created
      console.error('Failed to send signup email:', emailError);
    }

    console.log(
      `${isNewContact ? 'New' : 'Existing'} subscriber:`,
      email,
      source ? `| source: ${source}` : '',
      leadMagnet ? `| lead_magnet: ${leadMagnet}` : '',
      `| ${new Date().toISOString()}`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email signup error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';
    if (message.includes('already exists') || message.includes('409')) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Try again.' },
      { status: 500 }
    );
  }
}
