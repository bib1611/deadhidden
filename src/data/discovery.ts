/**
 * WHERE TO BEGIN — Topical Discovery System
 * Maps pain points to products so new visitors find exactly what they need.
 */

export type DiscoveryCategory = {
  id: string;
  headline: string;
  shortName: string;
  description: string;
  startHere: string; // slug of the free or cheap entry product
  productSlugs: string[]; // ordered from entry → advanced
  entryPoint: string; // 1-2 sentence reading path
};

export const discoveryCategories: DiscoveryCategory[] = [
  {
    id: 'masculinity',
    headline: 'THE WORLD WANTS YOU SOFT. GOD MADE YOU DANGEROUS.',
    shortName: 'Biblical Masculinity',
    description: 'Overcome porn, loneliness, weakness, and passivity. Scripture-based frameworks for real manhood.',
    startHere: '5-scriptures-forge-men',
    productSlugs: [
      '5-scriptures-forge-men', 'body-not-designed-for-hand', 'caged-porn',
      'loneliness-lie', 'uncomfortable-christ', 'what-are-you-hungry-for',
      'kings-conquest', 'biblical-masculinity', 'dick-detox',
    ],
    entryPoint: "Start with '5 Scriptures That Forge Men of Steel' (free). Then move to CAGED for the full warfare framework against sexual sin.",
  },
  {
    id: 'marriage',
    headline: 'STOP PLAYING HOUSE. START LEADING YOUR HOME.',
    shortName: 'Marriage & Headship',
    description: 'Biblical headship. Marriage rescue. Covenant conversation. For husbands done negotiating.',
    startHere: 'submission-fraud',
    productSlugs: [
      'submission-fraud', 'covenant-conversation-guide', 'when-she-stopped-asking',
      'kings-marriage-manual-red', 'headship-manual', 'family-throne-manual',
      'she-just-gets-me',
    ],
    entryPoint: "Start with 'The Submission Fraud' (free) to understand what biblical headship actually means. Then 'The King's Marriage Manual' for the operating blueprint.",
  },
  {
    id: 'spiritual-warfare',
    headline: 'THE ENEMY IS REAL. THESE ARE YOUR WEAPONS.',
    shortName: 'Spiritual Warfare',
    description: "Expose Satan's lies. Overcome mental torment. Break demonic strongholds with biblical weapons.",
    startHere: 'exposing-the-enemy',
    productSlugs: [
      'exposing-the-enemy', 'overcoming-mental-torment', 'break-free-modern-demons',
      'fourth-answer', 'blood-and-bandwidth', '5-deceptions', 'hellbound-and-down',
    ],
    entryPoint: "Start with 'Exposing the Enemy' to identify the specific lies you're believing. Then 'Overcoming Mental Torment' if you're struggling with depression, anxiety, or fear.",
  },
  {
    id: 'bible-study',
    headline: 'THE WORD OF GOD — UNFILTERED, UNDILUTED.',
    shortName: 'Bible Study',
    description: 'KJV Bible study methods, book studies, and reading protocols. Not devotionals. Weapons training.',
    startHere: '5-scriptures-forge-men',
    productSlugs: [
      '5-scriptures-forge-men', 'how-to-study-bible', 'darkest-proverbs',
      'bible-reading-protocol-2026', 'romans-nuclear-truth', 'esther-queen-violence',
      'forgotten-disciples', 'faith-vs-works', 'divine-rhetoric',
    ],
    entryPoint: "Start with '5 Scriptures That Forge Men of Steel' (free). Then 'How to Study the Bible Like Your Life Depends on It' for the complete system.",
  },
  {
    id: 'parenting',
    headline: 'GET TO YOUR KIDS BEFORE THE CULTURE DOES.',
    shortName: 'Parenting',
    description: 'Biblical parenting for fathers. Protect your children from cultural corruption. Raise warriors.',
    startHere: 'gods-design-for-bodies',
    productSlugs: [
      'gods-design-for-bodies', 'before-the-world-does', '12-conversations',
      'son-being-softened', 'absalom-protocol', 'kings-parenting-manual',
      'iron-sharpens-iron', 'before-the-world-does-student-workbook',
    ],
    entryPoint: "Start with 'God's Design for Bodies' (free) to see how one hard conversation works. Then 'Before The World Does' for the full strategy.",
  },
  {
    id: 'hidden-truths',
    headline: 'WHAT YOUR BIBLE ACTUALLY SAYS.',
    shortName: 'Hidden Truths',
    description: 'Giants, Nephilim, Hell, and everything churches skip. The hard passages in the KJV.',
    startHere: '30-biblical-rebels',
    productSlugs: [
      '30-biblical-rebels', 'hellbound-and-down', 'real-jesus-audio',
      'memento-mori', 'give-me-something-to-believe-in',
    ],
    entryPoint: "Start with '30 Biblical Rebels' (free) to meet characters your church never taught. Then 'Hellbound and Down' for the deep dive.",
  },
  {
    id: 'faith-doubt',
    headline: 'WHEN FAITH FEELS LIKE A LIE.',
    shortName: 'Faith & Doubt',
    description: "Wrestling with God. Unanswered prayers. Silence. For the man who can't feel God anymore.",
    startHere: 'fourth-answer',
    productSlugs: [
      'fourth-answer', 'letting-go-costs-everything', 'give-me-something-to-believe-in',
      'ash-pile-letters', 'prayers-for-crisis',
    ],
    entryPoint: "Start with 'The Fourth Answer' to reframe how you receive God's answers. Then 'Ash Pile Letters' for raw, honest wrestling with God.",
  },
  {
    id: 'for-women',
    headline: 'BIBLICAL WOMANHOOD WITHOUT THE FEMINIST FILTER.',
    shortName: 'For Women',
    description: "Christie Johnsson's collection. Prayer, Proverbs, motherhood, mentoring, and the women of Scripture.",
    startHere: 'biblical-womanhood-2026-reading-plan',
    productSlugs: [
      'biblical-womanhood-2026-reading-plan', '31-days-in-proverbs', 'scriptural-prayers',
      'villains-valiant-virtuous', 'titus-2-older-womans-calling', 'seasons-blur',
      'walking-together-devotional', 'biblical-womanhood-bundle',
      'find-godly-woman', 'queens-guide', 'queens-test',
      '60-uncomfortable-truths', 'traditional-homemaking',
    ],
    entryPoint: "Start with the '2026 Bible Reading Plan' to get into the Word daily. Then 'The Villains, The Valiant, & The Virtuous' for the full character study.",
  },
  {
    id: 'starter-kits',
    headline: 'JUST GIVE ME EVERYTHING.',
    shortName: 'Bundles & Vault',
    description: "Stop buying one at a time. The Vault, the bundles, and the starter kits that save you hundreds.",
    startHere: 'vault-sampler',
    productSlugs: [
      'vault-sampler', 'man-of-book-starter', 'warriors-bible-blueprint',
      'warriors-bible-conquest', 'essential-arsenal', 'warrior-bundle',
      'biblical-womanhood-bundle', 'the-vault',
    ],
    entryPoint: "Start with the 'Vault Sampler' (free) to see what's inside. Then the 'Essential Arsenal' ($97) for the 10 core resources. When you're ready — The Vault ($365) for everything.",
  },
];
