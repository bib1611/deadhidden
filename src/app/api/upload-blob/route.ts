import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export const runtime = 'nodejs';

const ALLOWED_FILES = new Set([
  'biblical-man-field-manual.pdf',
  'biblical-man-field-manual-bonus-01.pdf',
  'biblical-man-field-manual-bonus-02.pdf',
  'biblical-man-field-manual-bonus-03.pdf',
]);

/**
 * TEMPORARY upload endpoint — will be removed in the next commit.
 * Only allows uploading the 4 specific files listed above.
 */
export async function PUT(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get('filename');
  if (!filename || !ALLOWED_FILES.has(filename)) {
    return NextResponse.json(
      { error: 'Invalid filename. Only specific files are allowed.' },
      { status: 400 }
    );
  }

  const body = await request.arrayBuffer();
  if (body.byteLength < 1000 || body.byteLength > 50_000_000) {
    return NextResponse.json({ error: 'Invalid file size' }, { status: 400 });
  }

  const blob = await put(filename, Buffer.from(body), {
    access: 'public',
    contentType: 'application/pdf',
  });

  return NextResponse.json({ url: blob.url, pathname: blob.pathname });
}

export async function GET() {
  const result = await list();
  const blobs = result.blobs
    .filter((b) => b.pathname.endsWith('.pdf'))
    .map((b) => ({ pathname: b.pathname, url: b.url, size: b.size }));
  return NextResponse.json({ count: blobs.length, blobs });
}
