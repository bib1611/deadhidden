/**
 * TEMPORARY ADMIN ROUTE — DELETE AFTER UPLOAD IS COMPLETE
 *
 * Uploads multiple files from URLs to Vercel Blob in sequence.
 * POST /api/admin/upload-batch
 * Body: { files: [{ url: string, filename: string }], adminKey: string }
 */
import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { files, adminKey } = await request.json();

    if (!adminKey || adminKey !== process.env.ADMIN_UPLOAD_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: 'Missing or empty files array' },
        { status: 400 }
      );
    }

    const results: Array<{
      filename: string;
      success: boolean;
      url?: string;
      pathname?: string;
      error?: string;
    }> = [];

    for (const file of files) {
      const { url, filename } = file;

      if (!url || !filename) {
        results.push({
          filename: filename || 'unknown',
          success: false,
          error: 'Missing url or filename',
        });
        continue;
      }

      try {
        const fileResponse = await fetch(url);
        if (!fileResponse.ok) {
          results.push({
            filename,
            success: false,
            error: `Fetch failed: ${fileResponse.status} ${fileResponse.statusText}`,
          });
          continue;
        }

        const fileBuffer = await fileResponse.arrayBuffer();

        const blob = await put(filename, Buffer.from(fileBuffer), {
          access: 'public',
        });

        results.push({
          filename,
          success: true,
          url: blob.url,
          pathname: blob.pathname,
        });
      } catch (err) {
        results.push({
          filename,
          success: false,
          error: err instanceof Error ? err.message : 'Upload failed',
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;

    return NextResponse.json({
      total: files.length,
      successful: successCount,
      failed: files.length - successCount,
      results,
    });
  } catch (error) {
    console.error('Admin batch upload error:', error);
    const message = error instanceof Error ? error.message : 'Batch upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
