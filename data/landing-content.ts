export const landingContent = {
  hero: {
    eyebrow: "01 inApp",
    headlineLine1: "Everything at",
    headlineLine2: "one beautiful page",
    subtitle: "Smart links that open apps directly",
    body: "Redirect in under 5ms. Deep link into native apps. Build stunning bio pages. All from one dashboard.",
    primaryCta: "Go to Dashboard",
    bottomText: "No credit card needed. Free forever plan."
  },
  tryItNow: {
    eyebrow: "02 Try it now",
    body: "Paste any URL from a supported app and see the magic.",
    cta: "Convert"
  },
  stats: {
    eyebrow: "03",
    items: [
      { value: "< 5ms", label: "Average redirect time" },
      { value: "0", label: "Ads on your links. Ever." },
      { value: "99.9%", label: "Uptime on Cloudflare edge" },
      { value: "300+", label: "Edge locations worldwide" },
    ]
  },
  bioPages: {
    eyebrow: "04 Bio pages that stand out",
    body: "6 premium templates — from minimal portfolios to 3D carousels and product grids. Upload images, customize colors, and make it yours.",
    cta: "Build your bio page"
  },
  forms: {
    eyebrow: "05 Collect feedback with forms",
    body: "Build custom forms — feedback, surveys, contact. Get a shareable URL. All responses in a clean table with export to CSV.",
    features: [
      "Text · Email · Number",
      "Star Rating · Dropdown",
      "Radio · Checkbox"
    ],
    cta: "Create a form"
  },
  features: {
    eyebrow: "06 Everything you need, nothing you don't",
    items: [
      { title: "Deep Linking", description: "Links open in native apps. YouTube, Spotify, Instagram, and 7 more." },
      { title: "Bio Pages", description: "6 stunning templates. Upload images, customize everything. Your digital identity." },
      { title: "Analytics", description: "Country, city, device, browser, OS, referrer. Know exactly who clicks." },
      { title: "Custom Domains", description: "Use your own domain. go.yourdomain.com instead of inapp.app/you." },
      { title: "Team Management", description: "Invite editors and viewers. Manage links together without sharing passwords." },
      { title: "QR Codes", description: "Generate and download QR codes for any link. Works offline." },
      { title: "Smart Features", description: "Password protection, link expiry, scheduled activation, geo redirects." },
      { title: "No Lock-in", description: "Export all your data as CSV anytime. Cancel your plan in 2 clicks." },
    ]
  },
  supportedApps: {
    eyebrow: "07 Supported apps",
    apps: [
      "YouTube", "Spotify", "Instagram", "Twitter / X", "Amazon", 
      "TikTok", "WhatsApp", "Facebook", "SoundCloud", "Etsy", "+ more coming"
    ]
  },
  pricing: {
    eyebrow: "08 Simple, transparent pricing",
    tiers: [
      {
        name: "Free",
        price: "₹0",
        features: ["5 links", "Basic analytics", "1 bio template", "QR codes"],
        cta: "Get started",
        url: "/signup"
      },
      {
        name: "Pro",
        badge: "Popular",
        oldPrice: "₹999",
        discount: "70% off",
        price: "₹299/mo",
        features: ["50 links", "All features", "All bio templates", "Custom domains"],
        cta: "Choose Pro",
        url: "/pricing"
      },
      {
        name: "Business",
        oldPrice: "₹1,999",
        discount: "50% off",
        price: "₹999/mo",
        features: ["Unlimited links", "Team management", "All bio templates", "Dedicated support"],
        cta: "Choose Business",
        url: "/pricing"
      }
    ],
    footerCta: "View full pricing →"
  },
  finalCta: {
    headlineLine1: "Ready to make your",
    headlineLine2: "links work harder?",
    primaryCta: "Go to Dashboard",
    bottomText: "No credit card. No ads. No tracking on you."
  },
  footer: {
    brand: "inApp",
    links: [
      { label: "Privacy Policy", url: "https://app.inapp.app/privacy" },
      { label: "Terms of Service", url: "https://app.inapp.app/terms" },
      { label: "Pricing", url: "https://app.inapp.app/pricing" },
      { label: "Refund Policy", url: "https://app.inapp.app/refund" },
      { label: "Delete Account", url: "https://app.inapp.app/delete-account" }
    ]
  },
  analytics: {
    eyebrow: "Analytics",
    headlineLine1: "Measure",
    headlineLine2: "everything",
    body: "Understand your audience.",
    stats: [{ label: "Clicks", value: "10k+" }, { label: "CTR", value: "12%" }],
    cta: "View Analytics"
  },
  createPage: {
    eyebrow: "Create",
    headlineLine1: "Build your",
    headlineLine2: "page in minutes",
    body: "No code required.",
    features: ["Drag & Drop interface", "Real-time preview", "Custom CSS support"],
    cta: "Start Building"
  },
  faq: {
    eyebrow: "FAQ",
    headlineLine1: "Common",
    headlineLine2: "questions",
    items: [{ question: "Is it free?", answer: "Yes." }]
  },
  featureShowcase: [
    { eyebrow: "Share", headlineLine1: "Share", headlineLine2: "everywhere", body: "Any platform.", cta: "Learn more" },
    { eyebrow: "Monetize", headlineLine1: "Make", headlineLine2: "money", body: "Sell products.", cta: "Learn more" },
    { eyebrow: "Grow", headlineLine1: "Grow", headlineLine2: "fast", body: "Increase audience.", cta: "Learn more" }
  ],
  press: {
    eyebrow: "Press",
    headlineLine1: "In the",
    headlineLine2: "news",
    publications: ["TechCrunch", "Wired", "The Verge", "Forbes"]
  },
  shareEverywhere: {
    eyebrow: "Share",
    headlineLine1: "Share",
    headlineLine2: "everywhere",
    body: "Link in bio.",
    features: ["Instagram", "TikTok", "Twitter", "LinkedIn"],
    cta: "Get Started"
  },
  socialProof: {
    eyebrow: "Social Proof",
    headlineLine1: "Trusted by",
    headlineLine2: "creators",
    profiles: [{ type: "Creator", quote: "This is the best tool I've used." }]
  },
  testimonials: {
    headlineLine1: "What they",
    headlineLine2: "say",
    items: [{ quote: "Love it.", author: "Jane Doe", role: "Designer" }]
  },
  trustStrip: {
    eyebrow: "Trust",
    headlineLine1: "Trusted by",
    headlineLine2: "brands",
    body: "Global companies.",
    categories: ["Tech", "Design", "Fashion", "Music"]
  },
  whyUs: {
    eyebrow: "Why Us",
    headlineLine1: "Why choose",
    headlineLine2: "inApp",
    features: [{ number: "01", title: "Fast", description: "Lightning fast." }]
  }
};
