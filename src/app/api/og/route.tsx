import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const PUBLICATION_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  'dead-hidden': { bg: '#8b0000', text: '#ffffff', label: 'DEAD HIDDEN' },
  'biblical-man': { bg: '#1a3a1a', text: '#6b9b6b', label: 'THE BIBLICAL MAN' },
  'biblical-womanhood': { bg: '#2a1a2a', text: '#b07ab0', label: 'BIBLICAL WOMANHOOD' },
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') || 'Dead Hidden Ministries';
  const publication = searchParams.get('publication') || '';
  const type = searchParams.get('type') || 'article';
  const price = searchParams.get('price') || '';
  const subtitle = searchParams.get('subtitle') || '';

  const pub = PUBLICATION_COLORS[publication];

  // Fetch Inter Bold for the title text
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwYZ90OmPA.ttf')
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0a0a',
          position: 'relative',
        }}
      >
        {/* Red top bar */}
        <div
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#8b0000',
          }}
        />

        {/* Content area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '48px 60px 40px',
            justifyContent: 'space-between',
          }}
        >
          {/* Top row: branding + publication badge */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo area */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#8b0000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '16px',
                    backgroundColor: '#0a0a0a',
                    borderRadius: '0 0 4px 4px',
                    marginTop: '-4px',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#e8e0d0',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase' as const,
                }}
              >
                DEAD HIDDEN
              </span>
            </div>

            {/* Publication badge or price badge */}
            {type === 'product' && price ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#8b0000',
                  padding: '8px 20px',
                  borderRadius: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                  }}
                >
                  {price}
                </span>
              </div>
            ) : pub ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: pub.bg,
                  padding: '6px 16px',
                  borderRadius: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: pub.text,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase' as const,
                  }}
                >
                  {pub.label}
                </span>
              </div>
            ) : null}
          </div>

          {/* Center: Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '1000px',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 60 ? '42px' : title.length > 40 ? '52px' : '60px',
                fontWeight: 700,
                color: '#e8e0d0',
                lineHeight: 1.15,
                margin: 0,
                textTransform: 'uppercase' as const,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  fontSize: '22px',
                  color: '#888888',
                  margin: 0,
                  lineHeight: 1.4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Bottom: URL */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <span
              style={{
                fontSize: '16px',
                color: '#555555',
                letterSpacing: '0.15em',
              }}
            >
              deadhidden.org
            </span>
          </div>
        </div>

        {/* Subtle bottom border */}
        <div
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: '#1a1a1a',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  );
}
