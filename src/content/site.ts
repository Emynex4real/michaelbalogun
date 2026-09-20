export const site = {
  name: "Michael Balogun",
  role: "Frontend & Full-Stack Engineer",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  email: "michaelbalogun34@gmail.com",
  url: "https://michaelbalogun.dev",
  revision: "2026.09",
  availability: "Open to engineering roles",
  openTo: ["Full-time", "Contract", "Internship"],
  links: {
    github: "https://github.com/Emynex4real",
    linkedin: "https://www.linkedin.com/in/michael-balogun-326a3923b/",
    x: "https://x.com/Innovateamm",
  },
} as const;

export const statement = {
  headline: "Software for the exam that decides everything.",
  lede:
    "I build education products for Nigerian students — on cheap Android phones, over networks that drop, for stakes that don't forgive a broken form. Every constraint below is a real one I had to design around.",
};

/**
 * Every figure here is countable from source, not quoted from a README.
 * - topics / subjects: run the exam registry in InnovaTeam —
 *   `Object.values(REGISTRY).flatMap(e => e.subjects).reduce((n, s) => n + s.topics.length, 0)`
 *   → 2,543 topics across 68 subjects (JAMB 25, WAEC 19, JUPEB 19, ICAN 5).
 * - courses: `wc -l data/jamb_olevel_mapping_comprehensive.csv` in
 *   latest-course-recommender → 50 encoded course requirements.
 * Re-run both before an interview: you will be asked to defend each one.
 */
export const figures = [
  { value: "2,543", unit: "topics", label: "Syllabus topics encoded across four exam boards" },
  { value: "68", unit: "subjects", label: "Subject configurations driving question generation" },
  { value: "50", unit: "courses", label: "Admission requirements encoded and validated" },
];

export const principles = [
  {
    id: "P-01",
    rule: "Design for the worst device on the network.",
    note:
      "My users are on entry-level Android phones and metered data. That rules out heavy bundles, animation libraries and anything that needs a second round trip to become useful.",
  },
  {
    id: "P-02",
    rule: "Validate before you predict.",
    note:
      "A model that scores an invalid JAMB subject combination is confidently wrong. Deterministic rules gate the model, so the system fails loudly instead of guessing politely.",
  },
  {
    id: "P-03",
    rule: "One rule, computed in one place.",
    note:
      "A test is submitted three ways — signed in, as a shared public link, and again when theory answers are re-marked. All three call the same pure scoring function, because three copies of a marking rule is three different marks for the same paper.",
  },
  {
    id: "P-04",
    rule: "Secrets never reach the client.",
    note:
      "LLM and payment keys live behind an Express API, never in a bundled environment variable. The browser gets answers, never credentials.",
  },
  {
    id: "P-05",
    rule: "Ship the interface the value needs.",
    note:
      "The admission predictor's value is the model and the requirements data, so it shipped on Streamlit in hours. Spending a fortnight on a React frontend would have bought nothing a student could feel.",
  },
  {
    id: "P-06",
    rule: "A failure that only writes to a log is a silent failure.",
    note:
      "A week of payment failures left no trace: the provider had no record, nothing hit the database, and the container's log directory was wiped by the next deploy. Anything you'd want to count later needs a row in a table.",
  },
];

export const stack = [
  {
    group: "Languages",
    items: [
      { name: "TypeScript", note: "Strict mode, no implicit any" },
      { name: "JavaScript", note: "ES2022+. What InnovaTeam is written in" },
      { name: "Python", note: "Data work, model training, Streamlit apps" },
      { name: "SQL", note: "Postgres schema design, migrations, RLS policies" },
    ],
  },
  {
    group: "Interface",
    items: [
      { name: "React", note: "18 in production, 19 on newer builds" },
      { name: "Next.js", note: "App Router, static generation, metadata" },
      { name: "Vite / CRA", note: "SPA builds; CRACO for webpack overrides" },
      { name: "Tailwind / Radix", note: "Design tokens over ad-hoc utility soup" },
      { name: "CSS Modules", note: "Where a design system is worth hand-writing" },
    ],
  },
  {
    group: "Server & data",
    items: [
      { name: "Node.js / Express", note: "50 route modules, 46 controllers" },
      { name: "PostgreSQL", note: "Raw SQL, 68 versioned migrations, run on deploy" },
      { name: "Supabase", note: "Auth, Storage, row-level security" },
      { name: "Socket.io", note: "Live sessions, group chat, direct messaging" },
      { name: "Redis", note: "Upstash + node-cache, with explicit invalidation" },
      { name: "Docker / nginx", note: "VPS deploys via GitHub Actions" },
    ],
  },
  {
    group: "Models & integrations",
    items: [
      { name: "Google Gemini", note: "Question generation and document parsing in InnovaTeam" },
      { name: "DeepSeek", note: "Question generation in SuperExaminer, via the Vercel AI SDK" },
      { name: "scikit-learn / pandas", note: "Classification, feature engineering" },
      { name: "Paystack", note: "Local card and transfer payments, wallet, webhooks" },
      { name: "LiveKit / tldraw", note: "Live classes: video and a shared whiteboard" },
    ],
  },
];

export const profile = {
  paragraphs: [
    "I'm a software engineer in Lagos studying Information Systems, and the founder of InnovaTeam — an exam-preparation platform for Nigerian students sitting JAMB, WAEC and JUPEB, and for the tutorial centres that teach them.",
    "Most of what I've built serves people at a decision point: which course to apply for, whether a score is good enough, what to revise tonight. That context changed how I engineer. A dropped request isn't a metric on a dashboard; it's a student who gives up and closes the tab. So I build defensively — validate at the boundary, keep bundles small, make failure states say something useful.",
    "I work across the stack because the products I care about need it. I'll design the Postgres schema and the row-level security policy, write the Express layer that keeps the API key off the client, train the classifier, and then spend just as long on the form that a sixteen-year-old has to fill in on a cracked screen.",
  ],
  seeking:
    "I'm looking for a frontend or full-stack role on a team that ships to real users and cares about the constraints they're under. Remote or Lagos-based.",
};
