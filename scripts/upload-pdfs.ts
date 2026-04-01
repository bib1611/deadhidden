/**
 * Upload all product PDFs to Vercel Blob Storage.
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=vercel_blob_xxx npx tsx scripts/upload-pdfs.ts
 *
 * This uploads every PDF in ./product-files/ to Vercel Blob
 * and prints the resulting URLs. The base URL from the first
 * upload is what you set as FILE_STORAGE_URL in Vercel env vars.
 */

import { put, list } from '@vercel/blob';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const PRODUCT_FILES_DIR = join(process.cwd(), 'product-files');

async function main() {
  console.log('Scanning product-files directory...');
  const files = readdirSync(PRODUCT_FILES_DIR).filter((f) =>
    f.endsWith('.pdf')
  );

  console.log(`Found ${files.length} PDFs to upload.\n`);

  if (files.length === 0) {
    console.log('No PDFs found. Put your product PDFs in ./product-files/');
    process.exit(1);
  }

  // Check what's already uploaded
  console.log('Checking existing blobs...');
  const existing = await list();
  const existingNames = new Set(existing.blobs.map((b) => b.pathname));

  const results: Array<{ file: string; url: string; status: string }> = [];

  for (const file of files) {
    if (existingNames.has(file)) {
      const existingBlob = existing.blobs.find((b) => b.pathname === file);
      console.log(`SKIP (exists): ${file}`);
      results.push({
        file,
        url: existingBlob?.url || 'unknown',
        status: 'skipped',
      });
      continue;
    }

    const filePath = join(PRODUCT_FILES_DIR, file);
    const fileBuffer = readFileSync(filePath);

    console.log(`Uploading: ${file} (${(fileBuffer.length / 1024).toFixed(0)}KB)...`);

    const blob = await put(file, fileBuffer, {
      access: 'public',
      contentType: 'application/pdf',
    });

    console.log(`  ✓ ${blob.url}`);
    results.push({ file, url: blob.url, status: 'uploaded' });
  }

  console.log('\n========== UPLOAD COMPLETE ==========\n');

  const uploaded = results.filter((r) => r.status === 'uploaded');
  const skipped = results.filter((r) => r.status === 'skipped');

  console.log(`Uploaded: ${uploaded.length}`);
  console.log(`Skipped:  ${skipped.length}`);
  console.log(`Total:    ${results.length}\n`);

  // Extract the base URL pattern
  if (results.length > 0) {
    const sampleUrl = results[0].url;
    // Vercel Blob URLs look like: https://xxxxx.public.blob.vercel-storage.com/filename.pdf
    const baseUrl = sampleUrl.substring(0, sampleUrl.lastIndexOf('/'));
    console.log('FILE_STORAGE_URL for Vercel env vars:');
    console.log(`  ${baseUrl}\n`);
  }

  // Print all URLs
  console.log('All file URLs:');
  for (const r of results) {
    console.log(`  ${r.file}: ${r.url}`);
  }
}

main().catch((err) => {
  console.error('Upload failed:', err);
  process.exit(1);
});
