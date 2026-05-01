import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BuyButton } from '@/components/BuyButton';
import { getProductBySlug } from '@/data/products';

export const metadata: Metadata = {
  title:
    'For The Respectable Man Who Is Still Hollow — Biblical Man Field Manual',
  description:
    "13 chapters that name the loop you can't stop running. The 5-Wound Diagnosis, a direct way to read the KJV without commentary crutches, and the daily drill that breaks the cycle. $77. KJV only. Instant download.",
  openGraph: {
    title: "AND YOU'RE STILL HOLLOW.",
    description:
      "13 chapters that name what you've been managing for years. Then hand you the drill.",
    url: 'https://deadhidden.org/os',
    siteName: 'Dead Hidden Ministries',
    type: 'website',
    images: [
      {
        url: '/api/og?title=AND+YOU+ARE+STILL+HOLLOW&subtitle=Biblical+Man+Field+Manual',
        width: 1200,
        height: 630,
        alt: 'Biblical Man Field Manual',
      },
    ],
  },
  alternates: { canonical: 'https://deadhidden.org/os' },
};

const wounds = [
  'You have done everything a decent man is supposed to do — and still feel nothing.',
  'You can do the doctrine, the attendance, the provision, and you cannot name what is wrong.',
  'You have been reading around the Bible for years without letting it read you.',
  'You are running a loop you can see — and cannot stop.',
  'You want a closed system. Diagnosis. Weapon. Daily pattern. Not another devotional.',
];

const sections = [
  {
    n: 'I',
    title: 'THE 5-WOUND DIAGNOSIS',
    body: 'Names the five specific wounds respectable Christian men carry — the father wound, the provision mask, performance religion, the good man alibi, and emotional exile. Includes a scored self-audit so you know which one is yours.',
  },
  {
    n: 'II',
    title: 'READING THE BIBLE LIKE A MAN',
    body: 'Strips out the borrowed light. A direct, repeatable way to engage the King James Bible without commentary crutches, Greek decoder rings, or pastor-as-middleman. You and the text.',
  },
  {
    n: 'III',
    title: 'BREAKING THE GOOD MAN LOOP',
    body: 'Maps the exact cycle you have been running. Hands you a daily interruption pattern and a five-step emergency sequence for when the numb comes back.',
  },
];

const chapters = [
  ['Ch. 1', 'The Father Wound You Built a Life Around', 'Psalm 27:10'],
  ['Ch. 2', 'The Provision Mask: Hiding Behind Being Useful', 'Matthew 16:26'],
  ['Ch. 3', 'Performance Religion: The Clean Shirt Version of Deadness', '2 Tim. 3:5'],
  ['Ch. 4', 'The Good Man Alibi: Decency Is Not Righteousness', 'Isaiah 64:6'],
  ['Ch. 5', 'Emotional Exile: The Numb Life of the Respectable Man', 'Psalm 62:8'],
  ['Ch. 6', 'Put the Crutch Down: Borrowed Light Keeps a Man Weak', '2 Tim. 2:15'],
  ['Ch. 7', 'Read What Is There Before You Read Into It', '1 Cor. 2:13'],
  ['Ch. 8', 'Mark the Words. Track the Pattern. Follow the Thread.', 'Psalm 119:130'],
  ['Ch. 9', 'Let the Book Cut You Before You Explain It Away', 'Hebrews 4:12'],
  ['Ch. 10', 'A Name That Thou Livest: The Respectable Man’s Death Spiral', 'Rev. 3:1'],
  ['Ch. 11', 'Man Looketh on the Outward Appearance', '1 Sam. 16:7'],
  ['Ch. 12', 'Stop Covering: Confession That Costs You Something', 'Prov. 28:13'],
  ['Ch. 13', 'Do the Next True Thing: The Daily Rule That Breaks the Loop', 'James 1:22'],
];

const bonuses = [
  ['BONUS 1', 'The 5-Wound Self-Audit', 'Scored worksheet. Identifies your primary wound and the mask you wear over it.'],
  ['BONUS 2', 'Read-the-Text Like a Man Card', 'Printable 7-question Bible reading card. Keep it in your KJV.'],
  ['BONUS 3', 'The Good Man Loop Interrupt Sheet', '2-page emergency sequence for when the numb comes back.'],
];

const faqs = [
  {
    q: 'Is this a study Bible or a commentary?',
    a: 'No. It is a field manual. KJV exclusively. It teaches you to read the Bible directly — no commentary dependency, no Greek/Hebrew required. You and the text.',
  },
  {
    q: 'Who is this for?',
    a: 'Men 30-55 who are respectable, functional, and hollow. Men who have been in church for years and cannot name what is wrong. Men who have been providing, showing up, and staying — and feel nothing for it.',
  },
  {
    q: 'How long is it?',
    a: '13 chapters, ~120-160 formatted pages plus 3 bonus documents. Dense. Direct. Built to be re-read under pressure, not consumed once and shelved.',
  },
  {
    q: 'How will I get it?',
    a: 'Instant digital download. The moment payment clears, you get an email with secure links to the main manual and all three bonus documents.',
  },
  {
    q: 'Refund policy?',
    a: 'This is a digital product with instant access. All sales are final. See deadhidden.org/refund-policy.',
  },
];

export default function OSPage() {
  const product = getProductBySlug('biblical-man-field-manual');

  if (!product) {
    return null;
  }

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-[#e8e0d0]">
      {/* ─── HERO ─── */}
      <section className="px-4 pt-24 pb-16 sm:pt-32 sm:pb-20 max-w-3xl mx-auto text-center">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#8b0000] mb-6 font-bold">
          For The Respectable Man Who Did Everything Right
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[0.03em] leading-[1.02]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          AND YOU&rsquo;RE
          <br />
          STILL HOLLOW.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#8b0000] italic">
          13 chapters that name the loop you can&rsquo;t stop running.
        </p>

        <div className="mt-8 max-w-xl mx-auto space-y-4 text-[#aaa] text-base sm:text-lg leading-relaxed">
          <p>
            You&rsquo;ve been in church for years. You provide. You attend. You
            stay. And you cannot tell anyone what is wrong.
          </p>
          <p className="text-[#e8e0d0] font-bold">
            This manual names it. Then hands you the drill.
          </p>
        </div>

        <div className="mt-10">
          <div className="max-w-sm mx-auto">
            <BuyButton
              productSlug={product.slug}
              productName={product.name}
              priceLabel={product.priceLabel}
              isFree={false}
              isSubscription={false}
              ctaText={`GET THE MANUAL — ${product.priceLabel} →`}
            />
          </div>
          <p className="mt-3 text-xs text-[#666] uppercase tracking-[0.2em]">
            Launch Special &middot; Was $97 &middot; KJV Only &middot; Instant Download
          </p>
        </div>
      </section>

      {/* ─── COVER + DIAGNOSIS ─── */}
      <section className="border-y border-[#1a1a1a] py-16 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-4">
              Read this if any of these are true
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.03em] leading-tight mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              You can name the symptom.
              <br />
              <span className="text-[#8b0000]">You cannot name the wound.</span>
            </h2>
            <ul className="space-y-4">
              {wounds.map((w, i) => (
                <li key={i} className="flex gap-3 text-[#cccccc] leading-relaxed">
                  <span className="text-[#8b0000] font-bold flex-shrink-0">▸</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 relative aspect-[3/4] max-w-sm mx-auto w-full">
            <Image
              src={product.coverImage || ''}
              alt={product.name}
              fill
              className="object-cover border border-[#1a1a1a]"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>
        </div>
      </section>

      {/* ─── THREE-SECTION ARCHITECTURE ─── */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-4">
              Three sections. One sequence. No exit ramps.
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Diagnose. Reset. Break the loop.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((s) => (
              <div
                key={s.n}
                className="bg-[#0f0f0f] border-l-2 border-[#8b0000] p-6 md:p-8"
              >
                <div
                  className="text-3xl text-[#8b0000] font-bold mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {s.n}
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold uppercase tracking-[0.03em] mb-4 leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-[#aaa] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INSIDE — CHAPTERS + BONUSES ─── */}
      <section className="py-16 sm:py-24 px-4 border-y border-[#1a1a1a] bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-4">
              Every chapter rooted in the King James Bible
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              13 Chapters. 3 Bonuses.
            </h2>
          </div>

          <ul className="space-y-1 mb-12">
            {chapters.map(([n, title, ref]) => (
              <li
                key={n}
                className="grid grid-cols-[auto_1fr_auto] gap-3 sm:gap-6 items-baseline border-b border-[#1a1a1a] py-3 text-sm sm:text-base"
              >
                <span className="text-[#8b0000] font-bold uppercase tracking-[0.05em] w-12 sm:w-16">
                  {n}
                </span>
                <span className="text-[#e8e0d0] leading-tight">{title}</span>
                <span className="text-[10px] sm:text-xs text-[#666] italic whitespace-nowrap">
                  {ref}
                </span>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bonuses.map(([tag, title, body]) => (
              <div key={tag} className="bg-[#0f0f0f] p-6 border border-[#1a1a1a]">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-3">
                  {tag}
                </div>
                <h3
                  className="text-base font-bold uppercase tracking-[0.04em] mb-3 leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {title}
                </h3>
                <p className="text-sm text-[#aaa] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE PROMISE / THIS IS NOT A DEVOTIONAL ─── */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-6">
            What this is. What it is not.
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] leading-tight mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            This is not a devotional.
          </h2>
          <div className="space-y-5 text-[#cccccc] text-base sm:text-lg leading-relaxed text-left max-w-2xl mx-auto">
            <p>
              It will not make you feel better about yourself. If you read it
              honestly, it will name something you have been managing for
              years.
            </p>
            <p>
              After it names it, you will have to decide what to do.
            </p>
            <p className="text-[#e8e0d0] font-bold">
              That is the only question this book ends with.
            </p>
            <p>
              A post says you may be doing this. The manual says this is the
              exact loop. This is the cost. This is the verse. This is the
              drill. This is what you do tomorrow morning.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PROOF STRIP ─── */}
      <section className="py-12 border-y border-[#1a1a1a] bg-black">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ['70K+', 'Subscribers'],
            ['13', 'Chapters'],
            ['3', 'Bonus Docs'],
            ['KJV', 'Only'],
          ].map(([n, label]) => (
            <div key={label}>
              <div
                className="text-2xl md:text-3xl font-bold uppercase tracking-[0.04em] text-[#e8e0d0]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {n}
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#666] mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-4">
              Last questions
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Before you decide.
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="border-l-2 border-[#8b0000] pl-5">
                <h3
                  className="text-lg font-bold uppercase tracking-[0.03em] text-[#e8e0d0] mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {f.q}
                </h3>
                <p className="text-[#aaa] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 sm:py-28 px-4 border-t border-[#1a1a1a] bg-black">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8b0000] font-bold mb-6">
            One decision
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.03em] leading-[1.05] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Manage it for another year.
            <br />
            <span className="text-[#8b0000]">Or name it tonight.</span>
          </h2>
          <p className="text-[#aaa] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            13 chapters. 3 bonuses. A diagnosis, a weapon, and a daily drill —
            instant download. Read it tonight.
          </p>

          <div className="max-w-sm mx-auto">
            <BuyButton
              productSlug={product.slug}
              productName={product.name}
              priceLabel={product.priceLabel}
              isFree={false}
              isSubscription={false}
              ctaText={`GET THE MANUAL — ${product.priceLabel} →`}
            />
          </div>
          <p className="mt-4 text-xs text-[#666] uppercase tracking-[0.2em]">
            Launch Special &middot; Was $97 &middot; Refund If It Misses
          </p>
        </div>
      </section>

      {/* ─── PRO UPSELL FOOTER ─── */}
      <section className="py-12 px-4 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#666] mb-3">
            Want the whole arsenal monthly?
          </p>
          <p className="text-base text-[#cccccc] leading-relaxed mb-4">
            <span className="text-[#e8e0d0] font-bold">Dead Hidden Pro</span>{' '}
            &mdash; $29/mo. One guide token a month. The paid Substack tier.
            Everything except the Vault.
          </p>
          <Link
            href="/pro"
            className="inline-block text-sm uppercase tracking-[0.2em] text-[#8b0000] hover:text-[#a50000] font-bold underline-offset-4 hover:underline"
          >
            Learn About Pro &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
