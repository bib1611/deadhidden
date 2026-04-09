interface SubstackPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  publication: 'BIBLICAL MAN' | 'DEAD HIDDEN';
}

async function fetchSubstackFeed(
  url: string,
  publication: SubstackPost['publication']
): Promise<SubstackPost[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();

    const posts: SubstackPost[] = [];
    const items = xml.split('<item>').slice(1);

    for (const item of items) {
      const title = extractTag(item, 'title');
      const description = extractTag(item, 'description');
      const link = extractTag(item, 'link');
      const pubDate = extractTag(item, 'pubDate');

      if (title && link) {
        posts.push({
          title: decodeHtmlEntities(title),
          description: decodeHtmlEntities(stripHtml(description || '')).slice(0, 200),
          link,
          pubDate: pubDate || '',
          publication,
        });
      }
    }

    return posts;
  } catch {
    return [];
  }
}

function extractTag(xml: string, tag: string): string {
  // Handle CDATA sections
  const cdataMatch = xml.match(
    new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`)
  );
  if (cdataMatch) return cdataMatch[1].trim();

  const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? match[1].trim() : '';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#8211;/g, '\u2013');
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export async function SubstackFeed() {
  const [biblicalManPosts, deadHiddenPosts] = await Promise.all([
    fetchSubstackFeed('https://biblicalman.substack.com/feed', 'BIBLICAL MAN'),
    fetchSubstackFeed('https://followme419.substack.com/feed', 'DEAD HIDDEN'),
  ]);

  const allPosts = [...biblicalManPosts, ...deadHiddenPosts]
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    .slice(0, 3);

  if (allPosts.length === 0) return null;

  return (
    <section className="py-12 md:py-20 border-t border-[#222]">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="mb-10">
          <h2
            className="text-2xl md:text-3xl text-[#e8e0d0] uppercase tracking-[0.06em]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            FROM THE FIELD
          </h2>
          <p className="text-[#888] text-sm mt-2">
            Latest dispatches from both publications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allPosts.map((post, i) => (
            <a
              key={i}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#111] border border-[#222] border-l-2 border-l-[#8b0000] p-6 hover:border-[#333] transition-colors group"
            >
              <div
                className="text-[10px] tracking-[0.2em] text-[#8b0000] uppercase font-bold mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {post.publication}
              </div>

              <h3
                className="text-[#e8e0d0] font-bold text-sm md:text-base uppercase tracking-[0.04em] mb-2 group-hover:text-[#8b0000] transition-colors leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {post.title}
              </h3>

              {post.description && (
                <p className="text-[#777] text-xs line-clamp-2 mb-4 leading-relaxed">
                  {post.description}
                </p>
              )}

              <p className="text-[#555] text-xs mt-auto">
                {formatDate(post.pubDate)}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
