import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  products,
  CATEGORIES,
  getProductsByCategory,
  type Category,
} from '@/data/products';

/* ------------------------------------------------------------------ */
/*  SEO pillar content — 500-1000 words per category for Google       */
/* ------------------------------------------------------------------ */

const CATEGORY_SEO: Record<
  Category,
  {
    headline: string;
    seoTitle: string;
    seoDescription: string;
    pillarContent: string[];
    scripture: { text: string; reference: string };
    relatedCategories: Category[];
    keywords: string[];
  }
> = {
  vault: {
    headline: 'THE COMPLETE ARSENAL',
    seoTitle: 'The Biblical Man Vault — 50+ Christian Resources for Men | Dead Hidden',
    seoDescription:
      'Access the complete library of 50+ biblical guides, manuals, and protocols for Christian men. Marriage, masculinity, spiritual warfare, Bible study, and parenting — every resource in one place.',
    pillarContent: [
      'The Vault is the complete Dead Hidden library — every guide, manual, protocol, and framework Adam Johnson has ever created, bundled together for the man who refuses to go into battle unarmed.',
      'With over 50 resources spanning biblical masculinity, marriage headship, spiritual warfare, KJV Bible study, parenting, and more, The Vault represents years of writing from the trenches of real life. Not seminary theory. Not motivational fluff. These are battle-tested tools forged by a father of five, married twenty-four years, who has driven garbage trucks, conducted trains, and taught Sunday School for seventeen years straight.',
      'Every resource inside The Vault is available individually throughout the Dead Hidden store. But the man who buys them one at a time pays over $1,500 across sixty-six products. The Vault gives you all of it — instant download, lifetime access — for a fraction of that cost.',
      'This is for the man who looked at his life, his marriage, his fatherhood, and his faith — and decided he was done playing defense. The Vault is your offense.',
      'Inside you will find marriage rescue plans for husbands whose wives have stopped asking, Bible reading protocols that treat the Word of God like the weapon it is, parenting manuals for fathers who refuse to let the culture disciple their children, spiritual warfare guides for the battles nobody talks about in Sunday morning services, and masculinity frameworks that define manhood the way scripture defines it — not the way the world wants to redefine it.',
    ],
    scripture: {
      text: 'Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.',
      reference: 'Ephesians 6:11 (KJV)',
    },
    relatedCategories: ['marriage-family', 'masculinity', 'spiritual-warfare'],
    keywords: [
      'biblical man vault',
      'christian resources for men',
      'KJV bible study bundle',
      'biblical masculinity resources',
      'christian men guides',
    ],
  },
  'marriage-family': {
    headline: 'STOP PLAYING HOUSE. START LEADING YOUR HOME.',
    seoTitle: 'Biblical Marriage & Family Resources — Christian Headship Guides | Dead Hidden',
    seoDescription:
      'Biblical marriage guides for Christian husbands. Headship manuals, marriage rescue plans, family leadership, and covenant conversation tools rooted in KJV scripture.',
    pillarContent: [
      'Your marriage is not a partnership of equals negotiating household chores. It is a covenant. A battlefield. A kingdom with a throne — and God put you on it.',
      'The modern church has turned Christian marriage into a therapy session. Conflict resolution workshops. Love language quizzes. Weekend retreats where couples hold hands and cry. Meanwhile, Christian divorce rates mirror the secular world because nobody is willing to say the uncomfortable truth: most Christian men have abdicated their God-given role as head of their household.',
      'The Dead Hidden marriage and family resources exist for one reason — to hand that role back to you. Not as a suggestion. Not as one perspective among many. As the plain, direct command of scripture.',
      'Ephesians 5:23 says "the husband is the head of the wife, even as Christ is the head of the church." That is not a cultural artifact. It is not open to reinterpretation. It is the operating manual for your marriage, and ignoring it is why Christian marriages are collapsing at the same rate as the world\'s.',
      'These resources cover the full spectrum of biblical family life. For the newlywed who needs to establish headship from day one. For the husband whose wife stopped asking because she stopped believing he would step up. For the father whose family has become a democracy instead of a kingdom. For the man staring down divorce papers and wondering where it all went wrong.',
      'Every guide in this category is built on KJV scripture, written by a man who has been married twenty-four years and has five children. Not theory. Not counseling frameworks borrowed from secular psychology. Battle-tested truth from a man still in the fight.',
      'If your marriage is in trouble, start with The King\'s Marriage Manual. If your wife has gone silent, read When She Stopped Asking. If you need to establish family order from scratch, The Family Throne Manual is your blueprint. And if you cannot even start the hard conversations, the Covenant Conversation Guide gives you five biblical frameworks to break the silence.',
    ],
    scripture: {
      text: 'For the husband is the head of the wife, even as Christ is the head of the church: and he is the saviour of the body.',
      reference: 'Ephesians 5:23 (KJV)',
    },
    relatedCategories: ['parenting', 'women', 'masculinity'],
    keywords: [
      'biblical marriage guide',
      'christian headship manual',
      'marriage rescue plan christian',
      'biblical family leadership',
      'christian husband resources',
      'KJV marriage study',
      'how to lead your family biblically',
    ],
  },
  'bible-study': {
    headline: 'THE WORD OF GOD — UNFILTERED, UNDILUTED.',
    seoTitle: 'KJV Bible Study Guides & Reading Plans for Men | Dead Hidden',
    seoDescription:
      'In-depth KJV Bible study resources for Christian men. Reading protocols, book studies (Romans, Esther, Proverbs), and systematic Bible study methods rooted in the King James Bible.',
    pillarContent: [
      'You do not need another devotional. You do not need a reading plan that lets you check a box and feel spiritual. You need a system for driving the Word of God into your bones until it changes how you think, speak, and fight.',
      'The Dead Hidden Bible study resources are built on one conviction: the King James Bible is the preserved word of God in English. Not a translation preference. Not a tradition. The preserved text. Every study, every guide, every protocol on this page treats the KJV as the final authority — because it is.',
      'Most Bible study material on the market today is designed to make you comfortable. It is pre-digested, watered down, and aimed at the lowest common denominator of spiritual maturity. These resources are different. They assume you are an adult. They assume you can handle the hard passages. They assume you came here to study the Bible, not to feel good about yourself.',
      'The most popular resource in this category — How to Study the Bible Like Your Life Depends on It — has been purchased by over 300 men. It is not a reading plan. It is a system for extracting truth from scripture with the kind of discipline most men only apply to their careers or their workouts.',
      'For the man who wants to go deep into specific books, the Romans study exposes the most theologically explosive letter in the New Testament. The Darkest Proverbs covers the verses your pastor skips. The Esther study reveals a queen who played political chess and orchestrated the destruction of her enemies — all while fasting.',
      'For the man who needs structure, the 2026 Bible Reading Protocol treats scripture reading as military discipline. The Man of the Book Starter Guide is your entry point if you know you should be reading your Bible but have no idea where to begin.',
      'Every resource in this category is KJV only. No modern translations. No paraphrases. No watered-down substitutes for the living Word of God.',
    ],
    scripture: {
      text: 'Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth.',
      reference: '2 Timothy 2:15 (KJV)',
    },
    relatedCategories: ['spiritual-warfare', 'masculinity', 'free-resources'],
    keywords: [
      'KJV Bible study guide',
      'Bible reading plan for men',
      'King James Bible study resources',
      'how to study the Bible',
      'Romans Bible study KJV',
      'Proverbs study guide',
      'Christian men Bible study',
    ],
  },
  'spiritual-warfare': {
    headline: 'THE ENEMY IS REAL. THESE ARE YOUR WEAPONS.',
    seoTitle: 'Spiritual Warfare Resources for Christian Men — Biblical Battle Guides | Dead Hidden',
    seoDescription:
      'Spiritual warfare guides for Christian men. Expose Satan\'s lies, overcome mental torment, break demonic strongholds, and fight with biblical weapons. KJV-based resources.',
    pillarContent: [
      'The devil does not need you to worship him. He just needs you to believe his lies. And the modern church has made that easier than ever by pretending spiritual warfare is a metaphor.',
      'It is not a metaphor. It is the reality you walk through every single day. The temptation that hits you at 2 AM. The depression that follows you like a shadow. The anger that erupts out of nowhere. The addiction cycle you cannot seem to break no matter how many accountability partners you collect.',
      'These are not psychological disorders. They are spiritual battles. And you are losing them because nobody taught you how to fight.',
      'The Dead Hidden spiritual warfare resources arm you with what the Bible actually says about the enemy, his tactics, and the weapons God gave you to destroy his works. Not positive thinking. Not mindfulness. Not therapy-speak wrapped in scripture. The real weapons of your warfare — which, as 2 Corinthians 10:4 says, are not carnal but mighty through God to the pulling down of strongholds.',
      'Exposing the Enemy identifies Satan\'s five deadliest lies to Christian men — the specific deceptions keeping you in chains. Over 200 men have armed themselves with this guide. Overcoming Mental Torment addresses anxiety, depression, fear, and other struggles through the lens of scripture, not secular psychology. Break Free from Modern Demons in 7 Days is a seven-day intensive targeting specific strongholds with scripture, prayer, and action steps.',
      'Blood and Bandwidth confronts the modern reality of Christian persecution — the war on believers that is happening in real time, livestreamed for the world to watch and ignore. The Fourth Answer rewires how you approach prayer, faith, and the silence of God — because the problem is not that God is not answering. The problem is that you do not like the format of His answer.',
      'These resources assume the Bible is true. They assume the devil is real. They assume you are in a war whether you acknowledge it or not. The only question is whether you will fight armed or unarmed.',
    ],
    scripture: {
      text: 'For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places.',
      reference: 'Ephesians 6:12 (KJV)',
    },
    relatedCategories: ['masculinity', 'bible-study', 'marriage-family'],
    keywords: [
      'spiritual warfare prayers for men',
      'christian spiritual warfare guide',
      'overcoming spiritual attacks',
      'biblical weapons against satan',
      'breaking demonic strongholds',
      'christian mental health biblical',
      'spiritual warfare Bible study',
    ],
  },
  masculinity: {
    headline: 'THE WORLD WANTS YOU SOFT. GOD MADE YOU DANGEROUS.',
    seoTitle: 'Biblical Masculinity Resources — Christian Manhood Guides | Dead Hidden',
    seoDescription:
      'Biblical masculinity guides for Christian men. Overcome porn, loneliness, weakness, and passivity with scripture-based resources on true manhood. KJV only.',
    pillarContent: [
      'The culture is running a decades-long operation to redefine masculinity as toxic, dangerous, and in need of correction. And the church is helping them do it.',
      'Biblical masculinity is not toxic. It is not aggressive for the sake of aggression. It is not domineering. But it is also not soft, passive, apologetic, or safe. God designed men to lead, protect, provide, and fight — and every force in modern culture is working to strip those instincts from you before your sons inherit them.',
      'The Dead Hidden biblical masculinity resources exist because the church will not say what needs to be said. Your pastor will preach about servant leadership while your family falls apart because you have no authority in your own home. He will tell you to be more like Jesus while conveniently skipping the Jesus who made a whip of cords and drove the money changers out of the temple.',
      'This is the largest category on Dead Hidden because the crisis of masculinity is the root crisis. Fix the man, and the marriage follows. Fix the man, and the fatherhood follows. Fix the man, and the church stops producing spiritual children who cannot feed themselves.',
      'What Are You Really Hungry For exposes the seven counterfeit hungers destroying Christian men — porn, food, validation, control, and the others. Over 60 men have confronted their real hungers through this guide. CAGED goes deeper than accountability software into the root of sexual addiction. Your Body Wasn\'t Designed for Your Hand is the most downloaded resource on this site — a direct biblical confrontation with the sin every Christian man commits but nobody preaches about.',
      'The Loneliness Lie addresses the epidemic of male isolation — not with group therapy, but with the biblical framework for real brotherhood. The Uncomfortable Christ is a seven-day encounter with the Jesus your Sunday school never showed you.',
      'For the man who has something to say but cannot get it out, The Writer\'s Mechanism 7-Day Protocol is a writing system built for men on fire. For the man paralyzed by decisions, the Decision-Making System gives you practical templates rooted in biblical wisdom.',
      'Every resource here defines manhood the way God defined it — in His Word, in the King James Bible, without apology and without compromise.',
    ],
    scripture: {
      text: 'Watch ye, stand fast in the faith, quit you like men, be strong.',
      reference: '1 Corinthians 16:13 (KJV)',
    },
    relatedCategories: ['spiritual-warfare', 'marriage-family', 'bible-study'],
    keywords: [
      'biblical masculinity',
      'christian manhood guide',
      'biblical masculinity books',
      'overcoming porn christian',
      'christian men loneliness',
      'what does the Bible say about being a man',
      'christian masculinity resources',
    ],
  },
  parenting: {
    headline: 'GET TO YOUR KIDS BEFORE THE CULTURE DOES.',
    seoTitle: 'Biblical Parenting Resources for Christian Fathers | Dead Hidden',
    seoDescription:
      'Biblical parenting guides for Christian fathers. Protect your children from cultural corruption, raise warriors for God, and build a family that honors the King James Bible.',
    pillarContent: [
      'The world is discipling your children twenty-four hours a day, seven days a week. Social media. Public school. The entertainment industry. YouTube algorithms. TikTok. Every screen in your house is a pulpit — and the sermons being preached from those pulpits are destroying your kids from the inside out.',
      'Meanwhile, most Christian fathers have outsourced their children\'s spiritual formation to a youth group that meets once a week and a Sunday school teacher they have never spoken to. And they wonder why their eighteen-year-old walks away from the faith the moment they leave the house.',
      'The Dead Hidden parenting resources are built on a single conviction: it is your job. Not the church\'s job. Not the school\'s job. Not the youth pastor\'s job. Yours. Deuteronomy 6:7 did not say "and thou shalt let the professionals teach them." It said you shall teach them diligently unto your children — when you sit, when you walk, when you lie down, and when you rise up.',
      'Before The World Does is the flagship parenting resource — a comprehensive framework for getting to your children before the culture poisons them. It covers what to say, when to say it, and how to establish the kind of authority in your home that makes your children immune to the lies they will hear everywhere else.',
      'The 12 Conversations is for the father who realizes he has been performing fatherhood instead of actually being known by his children. These are the conversations every father must have before it is too late — not lectures, not sermons, but real conversations that build the kind of relationship your children will remember at your funeral.',
      'Your Son Is Being Softened While You Sleep is a wake-up call for the father who does not realize the culture is systematically dismantling his son\'s masculinity. The Absalom Protocol is for the father who sees rebellion forming and refuses to repeat David\'s mistake. The King\'s Parenting Manual is the biblical framework for raising men and women of God instead of fragile, screen-addicted shells.',
    ],
    scripture: {
      text: 'And, ye fathers, provoke not your children to wrath: but bring them up in the nurture and admonition of the Lord.',
      reference: 'Ephesians 6:4 (KJV)',
    },
    relatedCategories: ['marriage-family', 'masculinity', 'women'],
    keywords: [
      'biblical parenting guide',
      'christian father resources',
      'how to raise christian children',
      'christian parenting books',
      'protecting kids from culture',
      'biblical fatherhood guide',
      'christian family devotional',
    ],
  },
  women: {
    headline: 'BIBLICAL WOMANHOOD WITHOUT THE FEMINIST FILTER.',
    seoTitle: 'Biblical Womanhood Resources for Christian Women | Dead Hidden',
    seoDescription:
      'Biblical womanhood guides for Christian women. Find a godly man, raise your husband biblically, traditional homemaking, and uncomfortable truths from KJV scripture.',
    pillarContent: [
      'The feminist movement did not liberate women. It conscripted them into a war against their own design. And the modern church baptized the whole operation by reinterpreting submission, redefining roles, and producing a generation of Christian women who have no idea what biblical womanhood actually looks like.',
      'Christie Johnson runs the Biblical Womanhood Substack — a growing community of women committed to God\'s design for femininity, motherhood, and marriage. She writes daily about the quiet idols, the cultural lies, and the biblical truth that the modern church waters down. Subscribe at biblicalwomanhood.substack.com.',
      'The resources in this category pair with Christie\'s Substack teaching. They are not soft. They are not wrapped in pastel colors with encouraging quotes. They are direct, biblical, and unapologetic — because the women reading them have already had enough of the watered-down version.',
      'How to Find a Godly Man is for the single woman navigating a generation of boys in dress shirts. It provides a biblical framework for identifying the real ones — the men who fear God more than they fear being alone — and the red flags that prove a man is not what he claims to be.',
      'The Queen\'s Guide is for the married woman whose husband has not stepped up yet. Not manipulation. Not ultimatums. Biblical strategy for helping a man become the king God called him to be — without usurping his authority in the process.',
      'The Queen\'s Test examines three biblical women — Job\'s wife, Lot\'s wife, and Sarah — and their responses to crisis. 60 Uncomfortable Truths delivers exactly what the title promises: sixty truths from scripture about submission, modesty, motherhood, and womanhood that the modern church refuses to teach. Traditional Biblical Homemaking is a counter-revolutionary guide for the woman who chooses to build her home instead of her LinkedIn profile.',
    ],
    scripture: {
      text: 'Who can find a virtuous woman? for her price is far above rubies.',
      reference: 'Proverbs 31:10 (KJV)',
    },
    relatedCategories: ['marriage-family', 'parenting', 'free-resources'],
    keywords: [
      'biblical womanhood guide',
      'christian women resources',
      'how to find a godly man',
      'traditional homemaking christian',
      'biblical submission explained',
      'christian dating advice for women',
      'KJV womanhood study',
    ],
  },
  bundles: {
    headline: 'MULTIPLE RESOURCES. MAXIMUM IMPACT.',
    seoTitle: 'Christian Resource Bundles & Memberships | Dead Hidden',
    seoDescription:
      'Curated bundles of biblical resources for Christian men. Multiple guides, one price. Warrior bundles, memberships, and discounted collections from Dead Hidden.',
    pillarContent: [
      'Some battles require more than one weapon. The Dead Hidden bundles combine multiple resources into curated packages designed for maximum impact at a fraction of the individual cost.',
      'The Warrior Bundle is a curated collection of warrior-grade resources spanning spiritual warfare, biblical masculinity, and Bible study. For the man who is ready to go all in across multiple fronts simultaneously.',
      'The Table is a monthly membership — an inner circle for men who want direct access, exclusive content, and a seat alongside other men who refuse to be soft. Limited seats. Not a community for spectators.',
      'If you want everything — every guide, every manual, every protocol, every framework — The Vault in our main collection gives you the complete arsenal. Over fifty resources for the price of a few.',
    ],
    scripture: {
      text: 'Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.',
      reference: 'Proverbs 27:17 (KJV)',
    },
    relatedCategories: ['vault', 'masculinity', 'spiritual-warfare'],
    keywords: [
      'christian resource bundle',
      'biblical man membership',
      'discounted christian guides',
      'christian men community',
    ],
  },
  'free-resources': {
    headline: 'NO EXCUSES. GRAB THESE AND SEE WHAT YOU HAVE BEEN MISSING.',
    seoTitle: 'Free Christian Resources for Men — KJV Bible Guides | Dead Hidden',
    seoDescription:
      'Free biblical resources for Christian men. Bible reading challenges, scripture guides, submission study, and more. No credit card required. KJV only.',
    pillarContent: [
      'You have no excuse. These resources cost nothing. They require no credit card. They are instant downloads that will either wake you up or prove you were never serious in the first place.',
      'The free resources on Dead Hidden are not watered-down teasers. They are real tools that stand on their own. The Submission Fraud — grabbed by nearly 200 people — decodes the most misunderstood word in the Bible and exposes why the modern church has it completely backwards.',
      '30 Biblical Rebels gives you thirty men and women from scripture who broke every rule, defied every authority, and changed history — the ones most churches never mention because they do not fit safe, respectable Christianity.',
      '5 Scriptures That Forge Men of Steel delivers five verses that will put iron in your spine. Memorize them. Meditate on them. Let them forge you into the man God designed you to be.',
      'The Warrior\'s Bible Conquest is a 30/60/90-day scripture immersion challenge. Over 100 warriors have taken it. Choose your tier and immerse yourself in the Word with military-grade discipline.',
      'The Wind-Watcher Checklist is a practical tool based on Ecclesiastes 11:4 for the man paralyzed by overthinking. Memento Mori is a daily reminder that your time is running out — not morbid, but motivating.',
      'God\'s Design for Bodies is a free chapter from the full Before The World Does parenting resource — how to talk to your kids about bodies, gender, and sexuality before the world gets to them. And Divine Rhetoric is for the Christian writer who wants to build an audience without selling out.',
      'Start here. If these free resources do not convince you that the paid resources are worth every cent, nothing will.',
    ],
    scripture: {
      text: 'Ho, every one that thirsteth, come ye to the waters, and he that hath no money; come ye, buy, and eat; yea, come, buy wine and milk without money and without price.',
      reference: 'Isaiah 55:1 (KJV)',
    },
    relatedCategories: ['bible-study', 'masculinity', 'spiritual-warfare'],
    keywords: [
      'free christian resources',
      'free Bible study guide',
      'free KJV Bible reading plan',
      'free christian men resources',
      'free biblical masculinity guide',
      'free scripture challenge',
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Static generation for all 9 categories                             */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

/* ------------------------------------------------------------------ */
/*  SEO metadata                                                       */
/* ------------------------------------------------------------------ */

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const seo = CATEGORY_SEO[category as Category];
  if (!seo) return { title: 'Category Not Found' };

  return {
    title: seo.seoTitle,
    description: seo.seoDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.seoTitle,
      description: seo.seoDescription,
      url: `https://deadhidden.org/store/category/${category}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: seo.seoTitle,
      description: seo.seoDescription,
    },
    alternates: {
      canonical: `https://deadhidden.org/store/category/${category}`,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function CategoryPillarPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = categorySlug as Category;

  if (!CATEGORIES[category]) {
    notFound();
  }

  const seo = CATEGORY_SEO[category];
  const categoryProducts = getProductsByCategory(category);
  const featuredInCategory = categoryProducts.filter((p) => p.isFeatured);
  const restOfCategory = categoryProducts.filter((p) => !p.isFeatured);

  // Related categories
  const relatedCats = seo.relatedCategories;

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* JSON-LD for collection page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: CATEGORIES[category].label,
            description: seo.seoDescription,
            url: `https://deadhidden.org/store/category/${category}`,
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: categoryProducts.length,
              itemListElement: categoryProducts.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `https://deadhidden.org/store/${p.slug}`,
                name: p.name,
              })),
            },
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto text-xs tracking-[0.1em] uppercase text-[#888]">
          <Link href="/store" className="hover:text-[#e8e0d0] transition-colors">
            THE ARCHIVE
          </Link>
          <span className="mx-2 text-[#777]">/</span>
          <span className="text-[#e8e0d0]">{CATEGORIES[category].label}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[#222] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs tracking-[0.2em] uppercase text-[#8b0000] font-semibold mb-4">
            {categoryProducts.length} RESOURCES
          </div>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl uppercase font-bold text-[#e8e0d0] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {seo.headline}
          </h1>
          <p className="text-lg text-[#888] max-w-2xl">
            {CATEGORIES[category].description}
          </p>
        </div>
      </div>

      {/* Pillar Content — the SEO meat */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {seo.pillarContent.map((paragraph, i) => (
            <p
              key={i}
              className="text-base md:text-lg text-[#c0b8a8] leading-relaxed"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Scripture */}
      <div className="border-t border-b border-[#222] px-4 sm:px-6 lg:px-8 py-12 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm md:text-base text-[#888] leading-relaxed italic mb-2">
            &ldquo;{seo.scripture.text}&rdquo;
          </p>
          <p className="text-xs tracking-[0.1em] uppercase text-[#777]">
            {seo.scripture.reference}
          </p>
        </div>
      </div>

      {/* Featured Products */}
      {featuredInCategory.length > 0 && (
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              START HERE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredInCategory.map((product) => (
                <Link
                  key={product.slug}
                  href={`/store/${product.slug}`}
                  className="border border-[#8b0000]/40 bg-[#111] p-6 hover:border-[#8b0000] transition-colors flex flex-col"
                >
                  {product.badge && (
                    <span className="text-[10px] tracking-[0.15em] uppercase text-[#8b0000] mb-2">
                      {product.badge}
                    </span>
                  )}
                  <h3
                    className="text-lg uppercase font-bold text-[#e8e0d0] mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#888] mb-4 flex-grow">{product.tagline}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#e8e0d0]">
                      {product.isFree ? (
                        <span className="text-[#5cb85c]">FREE</span>
                      ) : (
                        product.priceLabel.endsWith('+') ? product.priceLabel.slice(0, -1) : product.priceLabel
                      )}
                    </span>
                    <span className="text-xs tracking-[0.15em] uppercase text-[#8b0000]">
                      {product.isFree ? 'DOWNLOAD →' : 'BUY NOW →'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Products */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 border-t border-[#222]">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {featuredInCategory.length > 0 ? 'ALL RESOURCES' : 'RESOURCES'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(featuredInCategory.length > 0 ? restOfCategory : categoryProducts).map((product) => (
              <Link
                key={product.slug}
                href={`/store/${product.slug}`}
                className="border border-[#222] bg-[#111] p-6 hover:border-[#8b0000] transition-colors flex flex-col"
              >
                <h3
                  className="text-lg uppercase font-bold text-[#e8e0d0] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {product.name}
                </h3>
                <p className="text-sm text-[#888] mb-4 flex-grow">{product.tagline}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#e8e0d0]">
                    {product.isFree ? (
                      <span className="text-[#5cb85c]">FREE</span>
                    ) : (
                      product.priceLabel
                    )}
                  </span>
                  <span className="text-xs tracking-[0.15em] uppercase text-[#8b0000]">
                    {product.isFree ? 'DOWNLOAD →' : 'BUY NOW →'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Related Categories */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 border-t border-[#222]">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-2xl uppercase font-bold text-[#e8e0d0] mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            RELATED COLLECTIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedCats.map((relCat) => {
              const relSeo = CATEGORY_SEO[relCat];
              const relProducts = getProductsByCategory(relCat);
              return (
                <Link
                  key={relCat}
                  href={`/store/category/${relCat}`}
                  className="border border-[#222] bg-[#111] p-6 hover:border-[#8b0000] transition-colors"
                >
                  <div className="text-xs tracking-[0.12em] uppercase text-[#8b0000] mb-2">
                    {relProducts.length} RESOURCES
                  </div>
                  <h3
                    className="text-lg uppercase font-bold text-[#e8e0d0] mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {CATEGORIES[relCat].label}
                  </h3>
                  <p className="text-sm text-[#888]">{CATEGORIES[relCat].description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-[#222] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-sm text-[#888] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            WANT EVERYTHING? GET THE COMPLETE ARSENAL.
          </p>
          <Link
            href="/store/the-vault"
            className="inline-block px-8 py-4 bg-[#8b0000] text-[#e8e0d0] font-semibold tracking-[0.15em] uppercase hover:bg-[#a80000] transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            GET THE VAULT — $297
          </Link>
        </div>
      </div>
    </main>
  );
}
