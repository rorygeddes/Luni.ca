Build Luni’s Marketing Site (Gia fundamentals, Luni content)

You are building a modern, outcome-led marketing site for Luni—a financial system that helps mostly younger, often unorganized users fix money problems through three pillars: Track, Split, Plan (with Money Pool + AI).

0) Foundations (brand + audience)

Positioning (one line): Spend with confidence—Luni helps you track, split, and plan your money automatically.

Audience: students and early-career adults (but approachable for all ages). Emphasize simplicity, calm visuals, friendly tone.

Aesthetic: inspired by Gia—clean, lots of white, confident headings, sticky primary CTA, soft glow accents, minimal ornament.

Stack: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui + Contentlayer (MDX) + Plausible analytics.

1) Pages & structure (map Gia’s flow to Luni)

/ Home — bold outcome hero, sticky CTA (“Join the Beta”), 3-card solutions (Track / Split / Plan), “How it works”, metrics/proof, testimonials, Security.

/solutions — index with the 3 pillars as cards.

/solutions/track

/solutions/split

/solutions/plan

/our-why — mission & values (student confidence, automation with oversight).

/get-started — embedded scheduler (Cal.com placeholder) + what to expect.

/blog — MDX (Contentlayer).

/privacy, /terms.

Global sticky CTA in navbar: “Join the Beta”.

2) Visual system (tokens + components)

Colors: Gold #EAB308 (accent #D4AF37), Ink #0F172A, Slate #334155, Off-white #F8FAFC, Card border #E5E7EB.

Type: Inter for UI, DM Sans for display (H1/H2 bold, tight leading).

Components (shadcn/ui): Button (primary/ghost), Badge, Card, Tabs, Accordion (FAQ), Tooltip, Sheet, Navbar (sticky), Footer.

Motion: subtle scale/translate on hover; reveal on scroll; respect prefers-reduced-motion.

3) Home page blueprint (copy scaffolds)

Hero (split layout)

H1: Fix your money—without the mental math.

Subhead: Luni cleans up your transactions, splits bills with friends, and turns leftovers into a simple plan—so you finally know what’s safe to spend.

CTAs: Primary “Join the Beta” • Secondary “Book a demo”.

Right visual: Phone mock with 3 tabs (Track / Split / Plan). Use the provided screenshots as art direction: rounded cards, gold highlights, donut chart, group balances, goal progress.

3-card Solutions (Track / Split / Plan)

Track: Your spending, auto-organized. Categorize, see top categories, watch remaining budget.

Split: No more “who owes who?”. Create groups, scan receipts, assign shares, settle fast.

*Plan (Money Pool): Make a plan for what’s left. Goals, guardrails, and simple rules that move leftover cash where it matters.

How it works (3 steps)

Connect accounts (read-only) and import past transactions.

Luni classifies + learns from your approvals.

You split and plan; Luni keeps you on track with gentle nudges.

Metrics strip (placeholders, make CMS-editable)

“–30% overspend on impulse categories” • “90-second onboarding” • “1-tap settle for groups”

Testimonials (carousel)

Student avatars, program/year; short, credible quotes.

Security & Privacy

Read-only connections, bank-grade encryption, you control your data; link to Privacy.

4) Solutions pages (copy & layout)

Each page uses: Outcome subhead → 3-step flow → Feature grid → Proof metric → FAQ → CTA.

/solutions/track

Subhead: See where money goes—without spreadsheets.

3 steps: Connect → Auto-categorize → Approve & Learn.

Feature cards: Top categories donut, “$X of $Y remaining”, month toggle, account tiles.

Proof: Faster clarity → less overspend (e.g., “Users cut food overspend by 18%”).

FAQ: “What if Luni mislabels?” (one-tap fix teaches model), “Which banks?”, “Will this hurt my credit?” (no).

/solutions/split

Subhead: Groups that settle themselves.

3 steps: Create group → Snap receipt → Assign shares & settle.

Feature cards: Member balances (+/–), reminders, partial payments, export.

Proof: “Average group settles in 2.3 days.”

FAQ: uneven splits, cash vs. e-transfer, recurring bills.

/solutions/plan

Subhead: The Money Pool makes leftover money do something.

3 steps: See monthly cash flow → Set rules (goals/limits) → Auto-move leftovers.

Feature cards: Goals with progress bars, weekly limits (e.g., Starbucks), Available vs. Allocated, end-of-month sweep.

Proof: “Users saved 10–20% more within 60 days.”

FAQ: goals vs. categories, pausing rules, emergency buffer.

5) Copy deck (ready to drop in)

Navbar: Solutions ▾ (Track, Split, Plan), Our Why, Blog, Join the Beta

Hero H1: Fix your money—without the mental math.

Hero subhead: Luni cleans up transactions, splits bills, and turns leftovers into a plan.

Button labels: Join the Beta • Book a demo • Explore Track • Explore Split • Explore Plan

Security bullet: Read-only bank connections. Bank-grade encryption. You own your data.

6) Technical requirements (quality bar)

SEO: per-route metadata, OG/Twitter images (dynamic API route), sitemap, robots.txt.

Perf: image optimization, font subsetting, route segment caching; aim Lighthouse ≥95 mobile.

A11y: semantic HTML, labeled controls, focus states, ≥4.5:1 contrast.

Analytics: Plausible; track cta_click, waitlist_submit, scheduler_open.

CMS: Contentlayer MDX for blog and key section copy (metrics, FAQs).

Forms: /api/waitlist → Supabase table waitlist(id uuid pk, email text, source text, created_at timestamptz default now()). Validate, de-dupe, show success state.

Scheduler: Embed Cal.com on /get-started with checklist of what users should bring (bank read-only creds, sample transactions, goals).

7) Routes & files (App Router)
/app
  /(marketing)
    /page.tsx
    /solutions/page.tsx
    /solutions/track/page.tsx
    /solutions/split/page.tsx
    /solutions/plan/page.tsx
    /our-why/page.tsx
    /get-started/page.tsx
    /privacy/page.tsx
    /terms/page.tsx
  /api/waitlist/route.ts
/components
  Navbar.tsx  Footer.tsx  Hero.tsx  PhoneMock.tsx
  MetricsStrip.tsx  TestimonialCarousel.tsx  Steps.tsx  FAQ.tsx
  SolutionCard.tsx  FeatureGrid.tsx
/lib/seo.ts  /lib/analytics.ts
/content/blog/*.mdx

8) Phone mock & imagery

Build <PhoneMock> with rounded-xl frame; cycle three screenshots that mirror the UI cards shown (Spending donut, Groups balances, Goals/Money Pool).

Light gradient glow (gold → transparent) behind device; subtle parallax on scroll.

9) Our Why (story beats)

Students are overwhelmed → most tools add work → Luni automates and keeps you in control.

Values: clarity over complexity; automation with approval; privacy first; tiny wins compound.

Timeline: idea → Track beta → Split groups → Money Pool → AI prompts (“Can I afford X?”).

10) Deliverables

A running Next.js project with Tailwind + shadcn, production-ready.

README with env setup (Supabase, Plausible, Cal.com), and Vercel deploy steps.

Sample MDX blog post: “How the Money Pool cures ‘leftover money drift’.”

Lighthouse screenshots (mobile & desktop) in /docs/.