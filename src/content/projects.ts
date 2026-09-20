export type Decision = {
  title: string;
  body: string;
  tradeoff: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  role: string;
  category: string;
  featured: boolean;
  stack: string[];
  links: { live?: string; repo?: string; note?: string };
  problem: string;
  brief: string[];
  decisions: Decision[];
  outcomes: { value: string; label: string }[];
  limits: string[];
};

/**
 * Accuracy rules for this file:
 *   1. Every figure is countable from source. If you cannot produce the command
 *      that prints it, it does not go in `outcomes`.
 *   2. `links.repo` is only set for a PUBLIC repository. A 404 on a source link
 *      is worse than no source link. Private work gets `links.note` instead.
 *   3. `stack` lists what the repository's manifest actually depends on — not
 *      what a project of this kind usually uses.
 *   4. If a build runs on mock data or is unfinished, that goes in `limits`.
 * Verified against GitHub and the live deployments on 2026-09-20.
 */
export const projects: Project[] = [
  {
    slug: "innovateam",
    index: "01",
    name: "InnovaTeam",
    tagline: "Exam prep for Nigerian students, and the platform their tutors run on",
    summary:
      "A production exam-preparation platform for JAMB, WAEC, JUPEB and ICAN candidates: practice banks and AI-generated questions for solo students, and a full teaching system — classes, live whiteboard sessions, marked tests, payments — for the tutorial centres that coach them.",
    year: "2025—2026",
    role: "Founder · Engineering lead",
    category: "EdTech · Product",
    featured: true,
    stack: ["React", "Express", "PostgreSQL", "Supabase", "Socket.io", "Google Gemini", "Paystack", "Docker"],
    links: {
      live: "https://innovateamprep.com",
      note: "Source is private — it handles live payments and student data. Happy to walk through any part of it in a call.",
    },
    problem:
      "A Nigerian student picks the course that will shape their working life using rumour, an older sibling's guess, and a cut-off mark someone posted on WhatsApp. Get it wrong and the cost is a year. The tutorial centres coaching them run on WhatsApp groups, printed past questions and a notebook of who has paid — so nobody, student or tutor, can see whether the preparation is working.",
    brief: [
      "Practice banks and AI-generated questions across four exam boards, built on a syllabus registry of 2,543 topics in 68 subjects.",
      "Tutorial centres get their own space: classes, an enrolment roster with approval, a question bank, test builder, marking and student analytics.",
      "Live classes over LiveKit with a shared tldraw whiteboard, a waiting room, raise-hand, and recorded audio replay.",
      "Wallet funding, subscriptions and one-off purchases through Paystack, because that is what Nigerian cards and bank transfers actually work with.",
      "Shareable public tests a tutor can send to a student with no account — the same paper, scored by the same engine.",
    ],
    decisions: [
      {
        title: "The syllabus is data, not prompt text",
        body:
          "Question generation is only as good as what you hand the model. Each of 68 subjects is a config file with its own topic list, exam-level description and domain instructions — 2,543 topics in all — so a request for a JAMB Biology question resolves to a specific topic at UTME level, not a generic ask the model answers at whatever difficulty it feels like.",
        tradeoff:
          "That registry is real ongoing work to keep current, and it is the reason adding an exam board is a week rather than an afternoon. The alternative — one prompt with the subject name in it — produces WAEC-level questions for a UTME paper, which is worse than no question.",
      },
      {
        title: "One scoring engine, three entry points",
        body:
          "A test can be submitted signed in, through a public share link, or re-marked later when a tutor grades theory answers. All three call the same pure function: no database access, no I/O — controllers load the data, it decides the numbers. It handles per-question marks, per-subject sections scored out of their own totals, and conversion of the final total.",
        tradeoff:
          "More indirection than scoring inline in each controller. It earned itself back immediately: pooled tests serve 40 questions drawn from a bank of 100, and the public path was grading those 40 answers against all 100 — a perfect paper scored 40%. One fix in one function corrected every path at once.",
      },
      {
        title: "Two databases on purpose, and one flag that decides which",
        body:
          "Supabase owns auth and user profiles; a Postgres instance beside the API owns centres, tests, questions and attempts. A single toggle picks the client, so local development runs against a sandbox and production runs raw SQL against the database next to it — no cloud round trip on the hot path.",
        tradeoff:
          "This is the sharpest edge in the codebase. Anything written on one side has to be explicitly synced to the other, and a query that assumes the wrong database fails in production while passing locally. I would take the latency win again, but it demands discipline every new contributor has to be taught.",
      },
      {
        title: "Failed payments get a row, not a log line",
        body:
          "A week of failed card payments was discovered only when a customer said they could not pay: the provider had no record of a request that never completed, nothing was written to the database, and the container's logs were destroyed by the next deploy. Failed attempts are now ledger rows, and six copied-and-pasted payment clients became one, with a timeout and retries.",
        tradeoff:
          "Failure rows have to be kept out of every revenue query, which is a constraint on all reporting from now on. Worth it: the outage could never be sized after the fact, because the evidence no longer existed.",
      },
      {
        title: "Paystack over Stripe",
        body:
          "Stripe does not meaningfully serve Nigerian cards. Paystack does, including bank transfer flows that a student without a working card can still complete.",
        tradeoff:
          "Ties payments to one regional provider and makes expanding beyond Nigeria a migration. Correct for the users who exist today.",
      },
    ],
    outcomes: [
      { value: "2,543", label: "syllabus topics across 68 subjects" },
      { value: "4", label: "exam boards: JAMB, WAEC, JUPEB, ICAN" },
      { value: "68", label: "versioned migrations, applied on every deploy" },
    ],
    limits: [
      "Single-region deployment on a Lagos-facing VPS — latency is honest, but not optimised for users outside West Africa.",
      "No offline mode yet. It is the next thing I want to fix: revision happens where data does not.",
      "The dual-database split is a deliberate trade I would revisit at a larger team size; it asks more of every new contributor than one database would.",
    ],
  },
  {
    slug: "digital-world",
    index: "02",
    name: "Digital World Corporate",
    tagline: "A corporate site built from a design system, not a template",
    summary:
      "The public site for a Lagos tech academy — About, Expertise, Case Studies and Team — built on a hand-written token system after three full design directions were drawn and one was chosen.",
    year: "2026",
    role: "Contract engineer",
    category: "Client work · Marketing site",
    featured: true,
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    links: {
      live: "https://digital-world-corporate.vercel.app",
      repo: "https://github.com/Emynex4real/digital-world-corporate",
    },
    problem:
      "The academy's existing site said what it sold but not why anyone should believe it, and every page had been styled by hand at a different moment, so the brand did not survive a scroll. A rebuild that started in components would have produced the same drift a year later.",
    brief: [
      "Four public pages — About, Expertise, Case Studies, Team — plus the landing page.",
      "One token file defining brand colour, ink and paper scales, type and radii, imported by everything.",
      "Motion used to establish hierarchy on entry, not as decoration.",
    ],
    decisions: [
      {
        title: "Three directions drawn before any of them was built",
        body:
          "Rather than argue about a site in the abstract, I built three separate visual directions as standalone files and put them in front of the client. Choosing between things you can see takes one meeting; describing them takes three.",
        tradeoff:
          "Two of the three were always going to be thrown away, which is real time spent on work that does not ship. It bought a decision that held — no repaint halfway through the build, which is the more expensive kind of rework.",
      },
      {
        title: "Tokens first, components second",
        body:
          "Brand, ink, paper, border, type and radius scales live in one `tokens.css` that every page imports. A component never picks a hex value; it names a role. Changing the brand orange is one line, and it moves everywhere at once.",
        tradeoff:
          "More ceremony than writing the colour where you need it, and it only pays off on the second page. On a four-page site that break-even arrives almost immediately.",
      },
      {
        title: "Motion on entry, and nowhere else",
        body:
          "Framer Motion is used to stage content as a section comes into view, so the eye is given an order to read in. Nothing loops, nothing moves on hover in the body copy, and nothing animates that the reader did not ask for by scrolling.",
        tradeoff:
          "Less immediately impressive than a page that is constantly in motion. A marketing site is read once by someone deciding whether to trust you; movement that does not carry meaning spends their attention for nothing.",
      },
    ],
    outcomes: [
      { value: "3", label: "design directions built and reviewed before commit" },
      { value: "1", label: "token file governing the whole site" },
      { value: "Live", label: "serving as the academy's public site" },
    ],
    limits: [
      "No CMS — copy changes are a deploy. Correct at this size, wrong the moment the academy wants to publish case studies weekly.",
      "The repository still carries the two unchosen directions. They are kept deliberately as a record of the decision, but they are not shipped code.",
    ],
  },
  {
    slug: "selliberation",
    index: "03",
    name: "Selliberation",
    tagline: "Subscription commerce with a six-level referral tree",
    summary:
      "A Nigerian affiliate commerce platform: members pay a monthly subscription, take online courses, and earn commissions on referrals up to six levels deep. Built as two applications — the member product and a standalone admin console.",
    year: "2026",
    role: "Solo engineer",
    category: "Commerce · Platform",
    featured: true,
    stack: ["React 19", "TypeScript", "Vite", "React Router v7", "Tailwind CSS v4", "Context API"],
    links: {
      live: "https://selliberation-theta.vercel.app",
      repo: "https://github.com/Emynex4real/selliberation",
      note: "The admin console is a separate application: github.com/Emynex4real/selliberation-admin",
    },
    problem:
      "Multi-level referral commerce lives or dies on one thing: whether a member believes the number on their earnings screen. Six levels of commission is not a hard idea, but it is easy to implement so that nobody — including the operator — can explain where a particular naira came from.",
    brief: [
      "Member product: courses, referral tree, earnings, withdrawals and settings behind a subscription.",
      "Admin console: users, courses, commissions, withdrawals, announcements and analytics, shipped as its own application.",
      "A written specification of the commission rules and the API that will enforce them, ahead of building either.",
    ],
    decisions: [
      {
        title: "The commission rules were specified before they were coded",
        body:
          "The payout logic is the product, so it is written down first — models, routes and the multi-level calculation — as a document in the repository rather than a comment discovered later. It is the one part of this system where being wrong costs real money and real trust.",
        tradeoff:
          "Writing the specification took time that could have gone into screens, and a document can drift from the code that follows it. I would rather fix a rule in a paragraph than in a payouts table that has already run.",
      },
      {
        title: "The admin console is a separate application",
        body:
          "Member and admin ship as two apps that share conventions and a design language but no code. An admin session is never one routing mistake away from a member's account, and the two can be deployed and locked down independently.",
        tradeoff:
          "The design system is maintained in two places and can drift, which is a real cost I pay on every visual change. Preferable to the blast radius of one bundle serving both roles.",
      },
      {
        title: "Mock data behind a real data shape",
        body:
          "The interface runs on a typed mock layer that matches the API contract exactly, so every screen was designed against realistic commission trees and withdrawal states rather than three tidy rows. Swapping to the live API is a change of module, not a change of components.",
        tradeoff:
          "Screens that work perfectly against mock data have never met a slow network, a partial failure or a race. Those are real gaps and they are listed below, not hidden.",
      },
    ],
    outcomes: [
      { value: "2", label: "applications: member product and admin console" },
      { value: "6", label: "referral levels in the commission model" },
      { value: "18", label: "route screens in the member product" },
    ],
    limits: [
      "The backend is specified, not built. Both applications currently run on a typed mock layer and browser-stored auth — this is a working front end and a written API contract, not a system taking payments.",
      "Nothing here has handled a real withdrawal. Until the commission engine runs server-side against a ledger, the earnings screens are a design, not a guarantee.",
    ],
  },
  {
    slug: "admission-predictor",
    index: "04",
    name: "Admission Predictor",
    tagline: "Modelling the odds before a student applies",
    summary:
      "A machine-learning system that estimates admission probability for ten Nigerian universities from UTME scores and O'Level grades — and refuses to answer when the subject combination is not valid in the first place.",
    year: "2025",
    role: "Solo engineer · Data",
    category: "Machine Learning",
    featured: true,
    stack: ["Python", "scikit-learn", "pandas", "Streamlit", "ReportLab"],
    links: {
      repo: "https://github.com/Emynex4real/latest-course-recommender",
    },
    problem:
      "Applicants choose a university and course blind, then wait months to learn they were never eligible. The requirements exist — subject combinations, cut-offs, course-by-course rules — but they are scattered across brochures and hearsay.",
    brief: [
      "Estimates admission probability from a student's UTME score and O'Level grades.",
      "Validates JAMB subject combinations and O'Level requirements against an encoded table of 50 courses, with per-university cut-offs and catchment rules for 10 federal institutions.",
      "Generates a PDF report the student can keep or show to someone advising them.",
    ],
    decisions: [
      {
        title: "Rules gate the model, not the other way round",
        body:
          "Eligibility is checked deterministically before anything is predicted. If a student's subject combination is not valid for Pharmacy, the system says so — it does not hand back a 12% probability for an application that cannot succeed.",
        tradeoff:
          "Maintaining an encoded requirements table (`data/jamb_olevel_mapping_comprehensive.csv`) is ongoing manual work as institutions change rules. A model alone would need no maintenance and would be confidently, uselessly wrong.",
      },
      {
        title: "A rule-based path the model can fall back to",
        body:
          "Prediction tries the trained classifier for the course's category and falls back to an explicit scoring function when no model covers it. A student always gets an answer with a reason attached, rather than an error or a silent zero.",
        tradeoff:
          "Two code paths that have to agree on what a probability means. Preferable to a UI that breaks for any course outside the nine categories I trained models for.",
      },
      {
        title: "Streamlit instead of a React frontend",
        body:
          "The value here is the requirements data and the eligibility logic. Streamlit put a usable interface in front of it in hours, which meant the next fortnight went into validation and features instead of component work.",
        tradeoff:
          "Limited control over UX and no path to a polished consumer product. If it graduates from tool to product, the frontend is a rewrite — and that is a fine problem to have later.",
      },
      {
        title: "Models trained offline and committed",
        body:
          "Nine pre-trained artefacts live in `models/`, one per course category, so the app boots and predicts immediately with no training step at startup.",
        tradeoff:
          "Model updates require a deploy, the binaries sit in version control, and — the real cost — the training run lives outside this repository, so its evaluation cannot be reproduced from a clone. That is a gap I would close before quoting an accuracy number anywhere.",
      },
    ],
    outcomes: [
      { value: "50", label: "courses with encoded JAMB and O'Level requirements" },
      { value: "10", label: "universities with cut-offs and catchment rules" },
      { value: "9", label: "category classifiers, plus a rule-based fallback" },
    ],
    limits: [
      "The 96.3% accuracy quoted in the project README is not reproducible from this repository — the training and evaluation code is not in it — so I do not present that figure as a result. Rebuilding the training run so the number can be earned back is the outstanding work.",
      "Cut-offs and requirements are a hand-maintained snapshot. They go stale every admission cycle and need re-verifying against each institution.",
    ],
  },
  {
    slug: "dwad",
    index: "05",
    name: "Dwad Music",
    tagline: "Distribution, studio and promotion for independent artists",
    summary:
      "A music platform for independent Nigerian artists — distribution, beats, studio booking, graphics and radio promotion — with a React front end and a dependency-free PHP API behind it.",
    year: "2026",
    role: "Solo engineer · Full-stack",
    category: "Full-stack · PHP + React",
    featured: true,
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "PHP 8.3", "MySQL", "Recharts", "Docker"],
    links: {
      live: "https://dwad-beige.vercel.app",
      repo: "https://github.com/Emynex4real/dwad",
    },
    problem:
      "An independent artist in Lagos is dealing with a distributor, a studio, a designer and a radio plugger as four separate conversations, paying each one differently and chasing every one of them for a status. The work is not hard to do; it is hard to keep track of.",
    brief: [
      "Public site covering distribution, beats, the studio, graphics and promotion, with artist signup.",
      "Admin back office for artists, beats, productions, spotlight placement, pricing and payouts.",
      "A PHP API with its own auth, rate limiting, mail and analytics, and a committed SQL schema.",
    ],
    decisions: [
      {
        title: "Plain PHP for the API, with no framework",
        body:
          "A single front controller dispatches to controllers; data access is PDO with prepared statements only. The client's hosting is shared PHP, so the practical choice was between a framework I would be fighting for memory and a small API I fully understand. Thirteen controllers is not a size that needs a framework.",
        tradeoff:
          "Everything a framework gives you free — routing conventions, validation, migrations, an ORM — is hand-written and therefore mine to get wrong. In exchange it deploys anywhere PHP runs, which is the constraint that actually mattered.",
      },
      {
        title: "Authorisation resolves the caller, never trusts the request",
        body:
          "Every protected route goes through a helper that resolves the user from a bearer token and checks the role server-side. No handler reads a user id or a role out of the request body. Passwords use the platform's own hashing, and the API has its own rate limiter in front of the auth routes.",
        tradeoff:
          "A lookup on every protected call rather than trusting a claim the client already holds. That is the correct price: a role you accept from the client is not a role, it is a suggestion.",
      },
      {
        title: "One HTTP client, no fetch in components",
        body:
          "Components never call `fetch`. Everything goes through a single typed client, so the base URL, the auth header, error shape and failure handling exist once. When the API moved behind a different origin it was one change.",
        tradeoff:
          "An indirection to learn before you can write a screen. It is the same reasoning that cost me a week on InnovaTeam when six copies of a payment client each failed differently — I would rather pay it up front.",
      },
      {
        title: "Strict TypeScript, and no untyped dependency",
        body:
          "The front end runs with unused locals and parameters as errors, no implicit any, and a standing rule that a library without types does not get installed. The API's JSON shapes are mirrored as types, so a field renamed on the server fails the build rather than rendering blank.",
        tradeoff:
          "Rules out some otherwise useful packages and makes the first hour of any feature slower. On a solo project, the compiler is the only other reviewer I have.",
      },
    ],
    outcomes: [
      { value: "13", label: "API controllers, framework-free" },
      { value: "2", label: "surfaces: public site and admin back office" },
      { value: "PDO", label: "prepared statements only, no interpolated SQL" },
    ],
    limits: [
      "No automated tests yet. For an API that moves payouts, that is the first thing I would add before it grows another controller.",
      "The schema ships as a single `schema.sql` rather than incremental migrations — fine for standing it up, not for evolving it once real data is in.",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Public repositories only — a source link that 404s is worse than no link. */
export const otherRepos = [
  {
    name: "superexaminer",
    note: "Document-to-quiz assessment platform: Next.js, Supabase row-level security, DeepSeek",
    lang: "TypeScript",
    href: "https://github.com/Emynex4real/superexaminer",
  },
  {
    name: "selliberation-admin",
    note: "The standalone admin console for Selliberation",
    lang: "TypeScript",
    href: "https://github.com/Emynex4real/selliberation-admin",
  },
  {
    name: "dw-feedback-system",
    note: "Three-step student feedback wizard for the academy",
    lang: "TypeScript",
    href: "https://github.com/Emynex4real/dw-feedback-system",
  },
  {
    name: "dw-student-account",
    note: "Student enrolment and progress portal",
    lang: "TypeScript",
    href: "https://github.com/Emynex4real/dw-student-account",
  },
  {
    name: "blazedoom",
    note: "React + TypeScript product build",
    lang: "TypeScript",
    href: "https://github.com/Emynex4real/blazedoom",
  },
  {
    name: "ars_project",
    note: "Earlier Streamlit build of the admission system",
    lang: "Python",
    href: "https://github.com/Emynex4real/ars_project",
  },
  {
    name: "Frontend-Mentor",
    note: "Component challenges — where the CSS fundamentals came from",
    lang: "CSS",
    href: "https://github.com/Emynex4real/Frontend-Mentor",
  },
];
