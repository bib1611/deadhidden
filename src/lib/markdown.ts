import { marked } from 'marked';

// Configure marked with custom rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Custom renderer for CTA blocks
const renderer = new marked.Renderer();

const originalParagraph = renderer.paragraph.bind(renderer);
renderer.paragraph = (token: any) => {
  const text = token.text || '';

  // Check if this is a CTA block
  if (text.includes(':::cta')) {
    const ctaContent = text.replace(/:::cta\s*/g, '').replace(/:::/g, '');
    return `<div class="cta-block bg-[#1a1a1a] border border-[#8b0000] p-6 rounded-sm my-8 text-[#e8e0d0]">
      ${marked(ctaContent)}
    </div>`;
  }

  return originalParagraph(token);
};

marked.setOptions({ renderer });

export async function parseMarkdown(content: string): Promise<string> {
  return marked(content) as Promise<string>;
}

export function extractTextContent(content: string): string {
  // Remove markdown syntax and code blocks
  return content
    .replace(/#{1,6}\s?/g, '') // Remove headings
    .replace(/\*\*|__|~~|\*|_|`/g, '') // Remove formatting
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // Convert links to text
    .replace(/:::cta[\s\S]*?:::/g, '') // Remove CTA blocks
    .split('\n')
    .filter((line) => line.trim())
    .slice(0, 2)
    .join(' ');
}
