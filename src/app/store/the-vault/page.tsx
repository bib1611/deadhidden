import type { Metadata } from 'next';
import { ProductJsonLd } from '@/components/JsonLd';
import { getProductBySlug } from '@/data/products';
import VaultLongForm from '@/components/cro/VaultLongForm';

export const metadata: Metadata = {
  title: 'The Vault — 83 KJV Resources, $297 (was $365) | Dead Hidden',
  description:
    'The Vault: 83 recovered documents — Bible study guides, marriage manuals, spiritual warfare protocols, parenting field manuals. KJV only. Instant download. $297 (was $365).',
  alternates: { canonical: 'https://deadhidden.org/store/the-vault' },
  openGraph: {
    title: 'The Vault — 83 KJV Resources',
    description: '83 recovered documents. One field package. KJV only. Instant download.',
    url: 'https://deadhidden.org/store/the-vault',
    type: 'website',
    images: [
      { url: 'https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/product-cover-the-vault.jpg', width: 1200, height: 630, alt: 'The Vault' },
    ],
  },
};

export default function VaultPage() {
  const product = getProductBySlug('the-vault');
  return (
    <main className="bg-ink text-bone">
      {product && (
        <ProductJsonLd
          name={product.name}
          description={product.tagline || product.description || ''}
          slug={product.slug}
          price={product.priceCents / 100}
          image={typeof product.coverImage === 'string' ? product.coverImage : undefined}
        />
      )}
      <VaultLongForm />
    </main>
  );
}
