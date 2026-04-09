# Dead Hidden — Claude Code Context File
> This file is the single source of truth for any AI agent working on this codebase.
> Perplexity Computer maintains this file. Claude Code reads it before touching anything.
> Last updated: 2026-04-09

---

## WHO THIS IS FOR
This file bridges Perplexity Computer (strategy, content, deployments, email, X, Substack) and Claude Code (codebase, implementation, debugging). Both agents serve the same operator. When in doubt, follow this file.

---

## THE OPERATOR
- **Name**: Biblical Man (thebiblicalman1611@gmail.com)
- **Brands**: Dead Hidden (deadhidden.org) + Biblical Man (biblicalman.substack.com)
- **ARR**: ~$84,000
- **X**: @biblicalman
- **Communication style**: Direct. Blunt. No hand-holding. Speed and output over explanation. "You handle all of this."

---

## THE STACK

### Website
- **URL**: deadhidden.org
- **Framework**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Hosting**: Vercel (auto-deploys on push to `main`)
- **Repo**: github.com/bib1611/deadhidden
- **Local clone**: `/home/user/workspace/deadhidden-repo/`

### Payments
- **Processor**: Stripe (NOT Gumroad — never Gumroad)
- **Webhook**: `/api/webhook/route.ts` — verifies Stripe signature, tags buyer in Resend, sends download email
- **Checkout**: `/api/checkout/route.ts` — creates Stripe session using `product.priceCents` as `unit_amount`
- **Success page**: `/api/success/route.ts` + `/store/[slug]/success/page.tsx`

### Email
- **Provider**: Resend
- **API Key**: `re_82qZ6ss7_7vM8i9B2ZYSwW3XQrYWP61mb`
- **Audience ID**: `853ea354-ef8b-4781-86cd-1b1032ad247e`
- **Verified sending domain**: `thebiblicalmantruth.com` (NOT deadhidden.org — domain conflict with Klaviyo on `send.deadhidden.org`)
- **From address**: `Dead Hidden <noreply@thebiblicalmantruth.com>`

### File Storage
- **Provider**: Vercel Blob
- **Store**: `store_VPfbq42gH0ucNfvW`
- **Public base URL**: `https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com`
- **Blob token**: `vercel_blob_rw_VPfbq42gH0ucNfvW_YvPqrIlO1BBXkvNkIvmMoESTMAdOCm`
- **CRITICAL**: Blob files have hash suffixes in their actual URLs. Always fetch the real URL via the Blob API before hardcoding. Never assume `{slug}.pdf` works — it will 404.

### DNS / Domain
- **Registrar/DNS**: IONOS
- **IONOS API Key**: `e9cb60bbe9424d27801fa45f0fafba28.6wyN53qctJkRu-w29AHONW6pFnyExcd9kwV6mStDMX60m8d7mGr27rsvRiWmeT4gesaOtDgXOoDkWfvcKcNsHw`
- **Known conflict**: `send.deadhidden.org` is delegated to Klaviyo nameservers — do NOT remove those NS records
- **Vercel CLI**: requires `NODE_TLS_REJECT_UNAUTHORIZED=0` in sandbox

### WriteStack
- **Tool**: writestack.io — Substack Notes scheduler + analytics
- **API Key**: `ws_e0973134c525fe15596ca9b8bbef5c43f861e7c07336c6dd831e7bd3b5f330de`
- **MCP**: In private beta — endpoint not yet public. Orel (founder) granting access manually. Once live, add MCP URL here and wire into Claude Code workflow.
- **Use case**: Schedule Substack Notes, analytics on what converts, activity center for engagement

### Analytics
- Vercel Analytics (built-in)
- Custom events tracked: `scroll_depth`, `smart_nudge`, `twostep_popup`, `mobile_slidein`, `product_view`, `email_signup`

---

## KEY DATA FILES

### `src/data/products.ts`
The single source of truth for all products. Product type includes:
```ts
slug: string
name: string
tagline: string
description: string
priceCents: number          // What Stripe charges — this is the real price
priceLabel: string          // Display label e.g. "$77"
originalPriceCents?: number // Pre-sale price for strikethrough display
salePriceCents?: number     // Sale price (display only if different from priceCents)
saleLabel?: string          // e.g. "LAUNCH SPECIAL"
category: string
isFeatured: boolean
isFree: boolean
badge?: string
purchaseType: string
stripePaymentLink?: string
seoKeywords?: string[]
ctaText?: string
comparisonLine?: string
extendedContent?: string
```

### `src/data/multi-part.ts`
Maps product slugs to their multiple PDF download parts. Both field manuals are multi-part (1 main PDF + 3 bonus PDFs each). The `/api/success` route must expand multi-part products — this was a bug fixed on 2026-04-09.

### `src/lib/blob.ts`
Handles Vercel Blob URL resolution via prefix matching. Hash-suffixed filenames resolve automatically if prefix matches.

---

## CURRENT PRODUCTS (as of 2026-04-09)

| Slug | Price | Type | Notes |
|------|-------|------|-------|
| `biblical-man-field-manual` | $77 | Multi-part (4 PDFs) | Launch special, was $97. isFeatured. |
| `biblical-woman-field-manual` | $77 | Multi-part (4 PDFs) | Launch special, was $97. isFeatured. |
| `the-essential-arsenal` | $97 | Vault | Full access bundle |
| `submission-fraud` | — | — | High traffic page |
| `break-free-modern-demons` | — | — | |
| `5-scriptures-forge-men` | — | — | Has download page |
| `biblical-womanhood-2026-reading-plan` | Free | — | |
| `biblical-womanhood-bundle` | — | — | |

**ARSENAL_SLUGS**: Both field manuals are included — webhook fires on purchase and tags buyer correctly.

---

## LEAD MAGNETS (as of 2026-04-09)

### The Three Alibis (men + women)
- **Page**: Homepage `#three-alibis` anchor
- **API**: `/api/lead-magnet/route.ts`
- **PDF Blob URL**: `https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/three-alibis-lead-magnet-DLwXc6A6Sdgg5bxDAmHc9NZS8BRCpe.pdf`
- **Component**: `LeadMagnetCapture.tsx`

### Women's Guide Series (3 guides)
- **Page**: `/for-women`
- **API**: `/api/women-guides/route.ts`
- **Component**: `WomensGuideCapture.tsx`
- **PDF Blob URLs**:
  - Guide 1 (Idol of Expectation): `https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/womens-guide-01-idol-of-expectation-kXgGarpLSfSA6fIgawDCEQz8RVfwLm.pdf`
  - Guide 2 (Subtle Takeover): `https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/womens-guide-02-subtle-takeover-FTp4uX1F5GVL68jd7IlVuqXmBhQ5gi.pdf`
  - Guide 3 (Performing for the Pew): `https://vpfbq42gh0ucnfvw.public.blob.vercel-storage.com/womens-guide-03-performing-for-pew-Pp5oBQZnHz7wGsI5y14ete6WgFguw1.pdf`

---

## CONTENT INFRASTRUCTURE

### Substacks
- **Biblical Man**: biblicalman.substack.com ($5/mo paid tier)
- **Dead Hidden**: followme419.substack.com ($8/mo paid tier)
- **Christie's**: biblicalwomanhood.substack.com (29K+ subscribers — partner, not owned)
- **RSS feeds used on homepage**: Both Substacks feed into `SubstackFeed.tsx` (ISR, 1hr revalidate)

### X / Twitter
- **Handle**: @biblicalman
- **Voice**: "Berserker on meth." Blood in line 1. Story + confrontation. KJV only. Links in self-reply only.
- **High performers**: Threads with story-first hooks, specific embodied detail, no explanation of the paradox
- **Substack share link format**: `open.substack.com/pub/PUBLICATION/p/POST-SLUG?r=2t2o3r`

### Active Series
1. **The God Who Bled** (Dead Hidden, 6-part) — Refutes atheist "God invented sin" meme line by line. Parts 1-2 published. Parts 3-6 paywalled.
2. **The Good Man's Alibi** (Biblical Man, 4-part) — Ordinary men living inside virtuous-sounding lies. Parts 1-2 published. Parts 3-4 paywalled.

---

## FIELD MANUALS — BLOB URLS

### Biblical Man Field Manual (4 files)
All at `vpfbq42gh0ucnfvw.public.blob.vercel-storage.com` — check multi-part.ts for exact URLs.

### Biblical Woman Field Manual (4 files)
All at `vpfbq42gh0ucnfvw.public.blob.vercel-storage.com` — check multi-part.ts for exact URLs.

---

## DESIGN SYSTEM

- **Background**: `#0a0a0a` or `bg-black`
- **Text**: `#e8e8e8` / `text-white`
- **Accent**: Crimson `#8B0000` / `text-red-700` / `border-red-700`
- **Cards**: Dark bg, crimson left border, hard edges — no gradients, no shadows, no decoration
- **Fonts**: WorkSans (display), Georgia (body in emails)
- **Mobile**: 63% of traffic is mobile/iOS. Every CTA must be above fold or sticky on mobile.

---

## KNOWN BUGS / FIXED (do not re-introduce)

| Date | Bug | Fix |
|------|-----|-----|
| 2026-04-09 | `/api/success` didn't expand multi-part products — buyers only got main PDF | Fixed: added MULTI_PART_PRODUCTS expansion |
| 2026-04-09 | Mobile sticky CTA showed $97 instead of $77, cut off on iPhone | Fixed: salePriceCents prop + iOS safe area |
| 2026-04-09 | Women's guide PDF blob URLs missing hash suffixes — 404 on download | Fixed: hardcoded exact blob URLs in route |
| 2026-04-09 | Three Alibis lead magnet PDF same issue | Fixed: hardcoded exact blob URL |
| 2026-04-08 | priceCents was $97 on both manuals but checkout charged $97 not $77 | Fixed: priceCents → 7700 on both |

---

## RULES FOR CLAUDE CODE

1. **Never touch Stripe payment links** — they are configured correctly
2. **Never touch `multi-part.ts` blob URLs** without verifying the exact hash-suffixed URL first
3. **Never remove Klaviyo NS records** from `send.deadhidden.org` in IONOS
4. **Always run `npm run build`** before pushing — catch TypeScript errors first
5. **Sending domain is `thebiblicalmantruth.com`** — not `deadhidden.org` (not verified on Resend)
6. **priceCents drives Stripe** — if you change priceLabel, also change priceCents to match
7. **Both field manuals are multi-part** — any success/download flow must expand them to 4 files
8. **Push to `main`** — Vercel auto-deploys, no separate deploy step needed

---

## RULES FOR PERPLEXITY COMPUTER

1. All code changes go through Claude Code subagent with `metadata='{"repo_url": "https://github.com/bib1611/deadhidden"}'`
2. All blob uploads: use direct curl with `BLOB_TOKEN` — Vercel proxy blocks Python urllib
3. After any blob upload, capture the full hash-suffixed URL and update this file + the relevant API route
4. Email blasts go via Resend API directly (curl), from `noreply@thebiblicalmantruth.com`
5. X threads: story hook tweet 1, links only in self-reply, no em dashes, no emojis
6. Update this file whenever: new product added, new blob URL created, new page built, bug fixed

---

## CHANGELOG (most recent first)

| Date | Change | Commit |
|------|--------|--------|
| 2026-04-09 | /for-women landing page + women's guide email capture + nav link | latest |
| 2026-04-09 | Homepage Substack feed (FROM THE FIELD) + Three Alibis lead magnet capture | — |
| 2026-04-09 | /where-to-begin rewrite for cold traffic | — |
| 2026-04-09 | Fixed download bug: multi-part expansion in /api/success | — |
| 2026-04-09 | Fixed mobile sticky CTA: sale price + iOS safe area | — |
| 2026-04-09 | Fixed blob URLs: hash suffixes in women's guides + three alibis emails | — |
| 2026-04-08 | Launch special banner on homepage + sale pricing on both manuals | 21033cd |
| 2026-04-08 | priceCents fixed to $77 on both field manuals | abb2fdc |
| 2026-04-08 | Women's manual added to store, multi-part.ts, ARSENAL_SLUGS, Blob | 836ecd8 |
| 2026-04-08 | Biblical Woman Field Manual built (13ch, 25,764 words, 99pp PDF + 3 bonus) | — |
| 2026-04-07 | Biblical Man Field Manual built (13ch, 25,062 words, 93pp PDF + 3 bonus) | aeec30c, 8ad42a3 |
