/**
 * TEMPORARY ADMIN ROUTE — DELETE AFTER UPLOAD IS COMPLETE
 *
 * Uploads a single file from a URL to Vercel Blob.
 * POST /api/admin/upload-from-url
 * Body: { url: string, filename: string, adminKey: string }
 */
import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { url, filename, adminKey } = await request.json();

    if (!adminKey || adminKey !== process.env.ADMIN_UPLOAD_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!url || !filename) {
      return NextResponse.json(
        { error: 'Missing required fields: url, filename' },
        { status: 400 }
      );
    }

    // Fetch the file from the provided URL
    const fileResponse = await fetch(url);
    if (!fileResponse.ok) {
      return NextResponse.json(
        { error: `Failed to fetch file from URL: ${fileResponse.status} ${fileResponse.statusText}` },
        { status: 502 }
      );
    }

    const fileBuffer = await fileResponse.arrayBuffer();

    // Upload to Vercel Blob
    const blob = await put(filename, Buffer.from(fileBuffer), {
      access: 'public',
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
    });
  } catch (error) {
    console.error('Admin upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
