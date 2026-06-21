// ───────────────────────────────────────────────────────────────────────────
// Dany Rud — "3 Handpan Patterns to get you flowing" course landing config.
// Brand: danyrud.com · sage palette · pay-what-you-can (donation) pricing.
// Everything that changes per-launch lives here so it can be edited in one spot.
// ───────────────────────────────────────────────────────────────────────────

export const course = {
  brand: "Dany Rud",
  brandUrl: "www.danyrud.com",
  kicker: "Online Course",
  instructor: "Dany Rud",
  title: "3 Handpan Patterns",
  titleLine2: "to get you flowing",
  slug: "3-flow-patterns",

  // ── Pricing: donation / pay-what-you-can. Amounts in cents.
  donation: true,
  currency: "eur" as const,
  presetCents: [500, 1000, 1500], // suggested amounts shown as buttons (€5/€10/€15)
  defaultCents: 1000, // pre-selected amount (€10)
  minCents: 100, // floor enforced on the server
  maxCents: 100000,

  // ── Cause callout: GoFundMe to defend the handpan against PANArt's legal claims.
  cause: {
    eyebrow: "Protect the handpan",
    title: "The handpan may become illegal.",
    body: "A legal battle threatens every maker's and player's right to freely build and play handpans. Dany stands with the global community defending it — and your support helps cover the campaign's legal costs.",
    ctaLabel: "Support the campaign",
    note: "Official GoFundMe by Ralf Van Den Bor",
    url: "https://www.gofundme.com/f/the-handpan-may-become-illegal-how-can-you-stop-that",
  },

  // Short pitch — straight from Dany's promo.
  pitch:
    "Dany's workshop is all about getting your hands moving and your music flowing. You will learn three practical patterns that you can take straight to your handpan and start using right away, whatever your level.",

  // ── Hero feature bullets (checkmark list).
  heroFeatures: [
    "5 step-by-step video lessons",
    "Suitable for all handpans",
    "From beginner to advanced",
    "A warm-up routine to play pain-free",
    "Bonus melodic pattern variations",
    "Lifetime access on any device",
  ],

  // ── Feature cards (grid under the hero).
  featureCards: [
    {
      title: "Beginner to advanced",
      body: "Three patterns that build from your very first groove to layered, musical playing.",
    },
    {
      title: "5 video lessons",
      body: "A warm-up, three core flow patterns, and a bonus melodic session — all with Dany.",
    },
    {
      title: "Learn at your own pace",
      body: "Lifetime access on any device. Rewatch every lesson as many times as you like.",
    },
    {
      title: "Pay what you can",
      body: "This course is donation-based — give what feels right and start playing today.",
    },
  ],

  // ── Curriculum. Order = display order. `preview: true` = free taster.
  modules: [
    {
      tag: "Start here",
      level: "All levels",
      title: "Introduction + Warm-up",
      description:
        "Set up your hands, posture, and a simple warm-up routine that primes you to play freely and avoid tension.",
      preview: true,
    },
    {
      tag: "Pattern 1",
      level: "Beginner",
      title: "Your first flowing pattern",
      description:
        "A simple, repeatable groove you can play today — the foundation every other pattern builds on.",
      preview: false,
    },
    {
      tag: "Pattern 2",
      level: "Intermediate",
      title: "Movement & dynamics",
      description:
        "Add motion and feel — connect the notes into one continuous, breathing flow across the pan.",
      preview: false,
    },
    {
      tag: "Pattern 3",
      level: "Advanced",
      title: "Layered & musical",
      description:
        "A richer, layered pattern that brings real musicality and the confidence to improvise.",
      preview: false,
    },
    {
      tag: "Bonus",
      level: "Extra",
      title: "Melodic patterns",
      description:
        "Take the three patterns further with melodic variations that make them unmistakably your own.",
      preview: false,
    },
  ],

  // ── What you'll learn.
  outcomes: [
    "Three practical patterns you can play on any handpan",
    "A warm-up routine that keeps your hands loose and pain-free",
    "The feel for connecting notes into continuous flow",
    "Melodic variations to make every pattern your own",
  ],

  // ── Testimonials. Replace with real ones when available.
  testimonials: [
    {
      quote:
        "I finally stopped hitting random notes. Within a week I had a pattern that actually sounded like music.",
      name: "Lena M.",
      role: "Started 3 months ago",
    },
    {
      quote:
        "Dany breaks everything down so clearly. The warm-up alone changed how my hands feel when I play.",
      name: "Tomás R.",
      role: "Intermediate player",
    },
    {
      quote:
        "Best handpan lessons I've found. The bonus melodic patterns are pure gold.",
      name: "Priya S.",
      role: "Self-taught, 1 year",
    },
  ],

  // ── FAQ.
  faq: [
    {
      q: "What's included in the course?",
      a: "Five video lessons with Dany Rud: a warm-up and introduction, three core flow patterns (beginner, intermediate and advanced), and a bonus melodic-patterns session. You get instant, lifetime access.",
    },
    {
      q: "How much does it cost?",
      a: "It's pay-what-you-can. Choose an amount that feels right for you at checkout — every contribution supports Dany's work and gives you full lifetime access.",
    },
    {
      q: "Do I need any experience?",
      a: "No. The course starts with a warm-up and a beginner pattern, then builds step by step. Complete beginners and seasoned players both get value.",
    },
    {
      q: "What handpan do I need?",
      a: "Any handpan in any scale works. The patterns are about movement and feel, not a specific note layout.",
    },
    {
      q: "Can I watch on my phone or tablet?",
      a: "Yes — watch on any device (computer, tablet, phone or smart TV), as many times as you like.",
    },
    {
      q: "How do I get access after I pay?",
      a: "After checkout you'll receive a private link to all the video lessons by email. Keep an eye on your inbox (and spam folder).",
    },
  ],
} as const;

export type Course = typeof course;

// Format a cents amount for display, e.g. "€30".
export function formatPrice(cents: number, currency: string): string {
  const symbol =
    currency === "eur" ? "€" : currency === "gbp" ? "£" : currency === "usd" ? "$" : "";
  const major = cents / 100;
  const str = Number.isInteger(major) ? String(major) : major.toFixed(2);
  return `${symbol}${str}`;
}
