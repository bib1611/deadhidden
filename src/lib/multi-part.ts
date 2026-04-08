/**
 * Multi-part product mappings.
 *
 * Some products consist of multiple separate PDF files.
 * When a customer purchases the parent slug, they receive
 * all parts as individual downloads.
 *
 * The part slugs must match the blob filenames (without the hash suffix).
 */
export const MULTI_PART_PRODUCTS: Record<
  string,
  Array<{ slug: string; name: string }>
> = {
  'loneliness-lie': [
    { slug: 'loneliness-lie-part-1', name: 'The Loneliness Lie — Part 1' },
    { slug: 'loneliness-lie-part-2', name: 'The Loneliness Lie — Part 2' },
    { slug: 'loneliness-lie-part-3', name: 'The Loneliness Lie — Part 3' },
    { slug: 'loneliness-lie-part-4', name: 'The Loneliness Lie — Part 4' },
  ],
  'biblical-man-field-manual': [
    { slug: 'biblical-man-field-manual', name: 'Biblical Man Field Manual' },
    { slug: 'biblical-man-field-manual-bonus-01', name: 'Bonus 1 — The 5-Wound Self-Audit' },
    { slug: 'biblical-man-field-manual-bonus-02', name: 'Bonus 2 — Read-the-Text Like a Man Card' },
    { slug: 'biblical-man-field-manual-bonus-03', name: 'Bonus 3 — The Good Man Loop Interrupt Sheet' },
  ],
  'biblical-woman-field-manual': [
    { slug: 'biblical-woman-field-manual', name: 'Biblical Woman Field Manual — Main Manual' },
    { slug: 'womens-bonus-01-quiet-inventory', name: 'Bonus 1 — The Quiet Little Inventory' },
    { slug: 'womens-bonus-02-field-card', name: 'Bonus 2 — Field Card for the Hard Day' },
    { slug: 'womens-bonus-03-sigh-rises', name: 'Bonus 3 — When the Sigh Rises' },
  ],
};

/**
 * Given a part slug (e.g. "loneliness-lie-part-2"), returns the parent slug
 * (e.g. "loneliness-lie") if it belongs to a multi-part product.
 */
export function getMultiPartParent(partSlug: string): string | null {
  for (const [parentSlug, parts] of Object.entries(MULTI_PART_PRODUCTS)) {
    if (parts.some((p) => p.slug === partSlug)) {
      return parentSlug;
    }
  }
  return null;
}
