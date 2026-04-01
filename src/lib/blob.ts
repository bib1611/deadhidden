import { list } from '@vercel/blob';

/**
 * Find the actual Vercel Blob URL for a product file.
 * Blob filenames have a hash suffix: "slug-HASH.pdf"
 * We search by prefix to find the match.
 */
export async function getBlobUrl(slug: string): Promise<string | null> {
  try {
    const result = await list({ prefix: `${slug}` });
    const match = result.blobs.find(
      (b) => b.pathname.startsWith(slug) && b.pathname.endsWith('.pdf')
    );
    return match?.url || null;
  } catch (error) {
    console.error(`Blob lookup failed for ${slug}:`, error);
    return null;
  }
}

/**
 * Get blob URLs for multiple product slugs at once.
 * Used for Vault downloads where we need all files.
 */
export async function getAllBlobUrls(): Promise<Map<string, string>> {
  const urlMap = new Map<string, string>();
  try {
    const result = await list();
    for (const blob of result.blobs) {
      if (blob.pathname.endsWith('.pdf')) {
        // Extract slug from "slug-HASH.pdf" → "slug"
        // The hash is always appended with a dash followed by alphanumeric
        const name = blob.pathname.replace('.pdf', '');
        // Remove the hash suffix (last dash + alphanumeric chunk)
        const slug = name.replace(/-[A-Za-z0-9]{20,}$/, '');
        urlMap.set(slug, blob.url);
      }
    }
  } catch (error) {
    console.error('Failed to list blobs:', error);
  }
  return urlMap;
}
