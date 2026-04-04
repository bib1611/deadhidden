import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { marked } from 'marked';
import { blogPosts, getBlogPost, BLOG_CATEGORIES, type BlogPost } from '@/data/blog-posts';
import { products } from '@/data/products';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  const baseUrl = 'https://deadhidden.org';
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&publication=dead-hidden&type=article`;

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      url: postUrl,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate || post.publishDate,
      authors: [post.author],
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: post.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

async function getPostContent(slug: string): Promise<string> {
  try {
    const filePath = join(process.cwd(), 'src/content/blog', `${slug}.md`);
    return readFileSync(filePath, 'utf-8');
  } catch {
    return '';
  }
}

function CtaBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#8b0000] p-6 rounded-sm my-8 text-[#e8e0d0]">
      {children}
    </div>
  );
}

function RelatedResources({ linkedProducts }: { linkedProducts: string[] }) {
  const relatedItems = linkedProducts
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  if (relatedItems.length === 0) return null;

  return (
    <div className="my-12 border-t border-b border-[#222] py-8">
      <h3
        className="text-2xl uppercase font-bold text-[#e8e0d0] mb-6"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Related Resources
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedItems.map((product) => (
          <Link
            key={product?.slug}
            href={`/store/${product?.slug}`}
            className="border border-[#222] bg-[#111] p-4 hover:border-[#8b0000] transition-colors"
          >
            <h4
              className="text-lg uppercase font-bold text-[#e8e0d0] mb-2 line-clamp-2 hover:text-[#8b0000]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {product?.name}
            </h4>
            <p className="text-sm text-[#888] line-clamp-2">{product?.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ContinueReading({ currentSlug }: { currentSlug: string }) {
  const otherPosts = blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);

  if (otherPosts.length === 0) return null;

  return (
    <div className="my-12 pt-8">
      <h3
        className="text-2xl uppercase font-bold text-[#e8e0d0] mb-6"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Continue Reading
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {otherPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="border border-[#222] bg-[#111] p-4 hover:border-[#8b0000] transition-colors flex flex-col"
          >
            <h4
              className="text-sm uppercase font-bold text-[#e8e0d0] mb-2 line-clamp-2 hover:text-[#8b0000]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {post.title}
            </h4>
            <p className="text-xs text-[#666] mt-auto">
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const content = await getPostContent(params.slug);

  if (!content) {
    notFound();
  }

  const htmlContent = await marked(content);
  const estimatedReadTime = Math.ceil(post.wordCount / 200);

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Navigation */}
        <Link href="/blog" className="text-xs tracking-[0.12em] uppercase text-[#8b0000] hover:text-[#a50000] transition-colors mb-8 inline-block">
          ← Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            {BLOG_CATEGORIES[post.category as keyof typeof BLOG_CATEGORIES]?.label || post.category}
          </div>

          <h1
            className="text-4xl md:text-5xl uppercase font-bold text-[#e8e0d0] mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {post.title}
          </h1>

          {/* Article Metadata */}
          <div className="flex flex-col gap-3 text-sm text-[#888] border-t border-b border-[#222] py-4">
            <div className="flex gap-4">
              <span>By {post.author}</span>
              <span>•</span>
              <span>
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>{estimatedReadTime} min read</span>
            </div>
            {post.updatedDate && (
              <div className="text-[#666]">
                Updated{' '}
                {new Date(post.updatedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert max-w-none mb-12">
          <div
            className="text-[#e8e0d0] leading-relaxed space-y-6"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: htmlContent,
              }}
              className="prose-blog"
            />
          </div>
        </article>


        {/* Related Resources */}
        <RelatedResources linkedProducts={post.linkedProducts} />

        {/* Continue Reading */}
        <ContinueReading currentSlug={post.slug} />

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-[#222]">
          <Link
            href="/blog"
            className="text-xs tracking-[0.12em] uppercase text-[#8b0000] hover:text-[#a50000] transition-colors"
          >
            ← Back to All Articles
          </Link>
        </div>
      </div>
    </main>
  );
}
