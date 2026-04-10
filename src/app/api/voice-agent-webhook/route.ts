import { NextResponse } from 'next/server';
import { AGENT_ID, appendCall, scanForProducts } from '@/lib/voice-calls';

const RESEND_API_KEY = 're_82qZ6ss7_7vM8i9B2ZYSwW3XQrYWP61mb';
const RESEND_AUDIENCE_ID = '853ea354-ef8b-4781-86cd-1b1032ad247e';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Validate agent_id
    if (payload.agent_id && payload.agent_id !== AGENT_ID) {
      return NextResponse.json({ error: 'Invalid agent_id' }, { status: 403 });
    }

    const conversationId = payload.conversation_id || '';
    const callerNumber = payload.phone_call_data?.caller_number || 'unknown';
    const duration = payload.call_duration_secs || 0;
    const status = payload.status || 'unknown';
    const summary = payload.analysis?.summary || '';
    const transcript = payload.transcript || [];

    const productsMentioned = scanForProducts(transcript);

    const call = {
      id: conversationId,
      caller: callerNumber,
      duration,
      status,
      summary,
      products_mentioned: productsMentioned,
      timestamp: new Date().toISOString(),
    };

    await appendCall(call);

    // Add caller to Resend audience
    if (callerNumber && callerNumber !== 'unknown') {
      const placeholderEmail = `${callerNumber.replace(/[^0-9+]/g, '')}@voice.deadhidden.org`;
      try {
        await fetch(
          `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: placeholderEmail,
              first_name: 'voice_call',
              unsubscribed: false,
            }),
          }
        );
      } catch (e) {
        console.error('Resend contact add error:', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Voice webhook error:', e);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
