#!/usr/bin/env node
/**
 * Upload The Dog At The King's Table PDF + cover JPG to Vercel Blob.
 *
 * Run from the deadhidden project root:
 *   node --env-file=.env.local scripts/upload-dog-product.mjs
 *
 * Requires BLOB_READ_WRITE_TOKEN in .env.local. If you don't have it:
 *   vercel link    # link this dir to the deadhidden project
 *   vercel env pull .env.local
 *
 * Files expected at:
 *   ~/Library/Mobile Documents/com~apple~CloudDocs/OUTPUTS/the-dog-at-the-kings-table-v1.pdf
 *   ~/Library/Mobile Documents/com~apple~CloudDocs/OUTPUTS/product-cover-the-dog-at-the-kings-table.jpg
 *
 * After upload, getBlobUrl('the-dog-at-the-kings-table') resolves to the PDF.
 * The cover JPG lands at /product-cover-the-dog-at-the-kings-table.jpg.
 */

import { put, list } from '@vercel/blob';
import { readFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { resolve } from 'node:path';

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('✖ BLOB_READ_WRITE_TOKEN not found. Set it in .env.local or run: vercel env pull .env.local');
  process.exit(1);
}

const HOME = homedir();
const PDF_PATH = resolve(HOME, 'Library/Mobile Documents/com~apple~CloudDocs/OUTPUTS/the-dog-at-the-kings-table-v1.pdf');
const COVER_PATH = resolve(HOME, 'Library/Mobile Documents/com~apple~CloudDocs/OUTPUTS/product-cover-the-dog-at-the-kings-table.jpg');

async function uploadOne(filePath, blobName, contentType) {
  console.log(`\n→ Reading ${filePath}`);
  const buf = await readFile(filePath);
  console.log(`  Size: ${(buf.length / 1024).toFixed(1)} KB`);

  console.log(`→ Uploading to Vercel Blob as ${blobName}`);
  const blob = await put(blobName, buf, {
    access: 'public',
    contentType,
    addRandomSuffix: blobName.endsWith('.pdf'), // PDFs get a hash suffix; covers do not
    allowOverwrite: !blobName.endsWith('.pdf'), // PDFs never overwrite, covers do
  });

  console.log(`  ✓ Uploaded`);
  console.log(`  Path:  ${blob.pathname}`);
  console.log(`  URL:   ${blob.url}`);
  return blob;
}

async function verifyPdf(slug) {
  console.log(`\n→ Verifying PDF lookup for slug "${slug}"`);
  const result = await list({ prefix: slug });
  const match = result.blobs.find((b) => {
    if (!b.pathname.endsWith('.pdf')) return false;
    const name = b.pathname.replace('.pdf', '');
    return name === slug || /^-[A-Za-z0-9]+$/.test(name.slice(slug.length));
  });
  if (match) {
    console.log(`  ✓ getBlobUrl("${slug}") will resolve to:`);
    console.log(`    ${match.url}`);
  } else {
    console.log(`  ✖ getBlobUrl("${slug}") did NOT find a match. Check naming convention.`);
  }
}

(async () => {
  try {
    // 1) Upload the PDF — name it exactly the slug so getBlobUrl("the-dog-at-the-kings-table") finds it
    await uploadOne(PDF_PATH, 'the-dog-at-the-kings-table.pdf', 'application/pdf');

    // 2) Upload the cover image — convention: product-cover-{slug}.jpg, no random suffix
    await uploadOne(COVER_PATH, 'product-cover-the-dog-at-the-kings-table.jpg', 'image/jpeg');

    // 3) Verify the PDF lookup works
    await verifyPdf('the-dog-at-the-kings-table');

    console.log('\n✓ All uploads complete. Ready to ship.');
    console.log('\nNext steps:');
    console.log('  1. Verify products.ts entry committed.');
    console.log('  2. Verify webhook tag DOG_TABLE_SLUGS committed.');
    console.log('  3. git add . && git commit -m "Launch: The Dog At The King\\\'s Table"');
    console.log('  4. git push (Vercel auto-deploys).');
    console.log('  5. Configure Resend automation per drip-sequence doc.');
    console.log('  6. Test purchase end-to-end.');
  } catch (err) {
    console.error('\n✖ Upload failed:', err.message);
    process.exit(1);
  }
})();
