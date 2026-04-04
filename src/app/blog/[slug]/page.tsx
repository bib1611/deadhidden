import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';
import { marked } from 'marked';
import { blogPosts, getBlogPost, getRelatedBlogPosts, AUTHOR_DISPLAY } from '@/data/blog-posts';
import { BlogPostJsonLd } from '@/components/JsonLd';
import { BlogReader } from '@/components/BlogReader';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Not Found | Dead Hidden' };
  }

  const baseUrl = 'https://deadhidden.org';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&publication=dead-hidden&type=article`;

  return {
    title: `${post.title} | Dead Hidden`,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    authors: [{ name: AUTHOR_DISPLAY[post.author] }],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      url: postUrl,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate || post.publishDate,
      authors: [AUTHOR_DISPLAY[post.author]],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
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
    const md = readFileSync(filePath, 'utf-8');
    return await marked(md);
  } catch {
    return '';
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Try to load markdown content, fall back to post.content field
  let contentHtml = await getPostContent(slug);
  if (!contentHtml && post.content) {
    contentHtml = post.content;
  }

  const relatedPosts = getRelatedBlogPosts(slug, post.category, 3);

  // If no same-category related posts, show other posts
  const displayRelated =
    relatedPosts.length > 0
      ? relatedPosts
      : blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.metaDescription}
        slug={post.slug}
        publishDate={post.publishDate}
        updatedDate={post.updatedDate}
        author={AUTHOR_DISPLAY[post.author]}
        keywords={post.keywords}
        wordCount={post.wordCount}
      />
      <BlogReader
        post={post}
        contentHtml={contentHtml}
        relatedPosts={displayRelated}
      />
    </>
  );
}
