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

/**
 * This is the positioning statement, and it is about the engineer, not about
 * any one product. If a rewrite makes the homepage read as though a single
 * project is the whole story, it is wrong — the range is the point.
 */
export const statement = {
  headline: "I build the whole thing, and then keep it running.",
  lede:
    "I'm a full-stack engineer in Lagos. I've built an exam platform that takes real money, a music service on a framework-free PHP API, an affiliate commerce product, a machine-learning tool for university applicants, and client work in between. Different domains, same job: I design the data, build the interface, and answer for it when it breaks.",
};

/**
 * Every figure here is countable, and each one is about range rather than any
 * single product — depth belongs in the case studies, where it can be defended.
 * - products: `projects.length` in content/projects.ts → 5.
 * - live: the four deployments whose links return 200 — innovateamprep.com,
 *   digital-world-corporate, selliberation-theta, dwad-beige. Re-check them
 *   before an interview; a dead link here is worse than no link.
 * - backends: written from scratch — InnovaTeam's Express API and dwad's
 *   framework-free PHP 8.3 API. Supabase and Streamlit are not counted.
 */
export const figures = [
  { value: "5", unit: "products", label: "Education, commerce, music, machine learning and client work" },
  { value: "4", unit: "live", label: "Deployments you can open right now — one of them takes real payments" },
  { value: "2", unit: "backends", label: "Written from scratch: Node/Express and a framework-free PHP API" },
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
      "A model that scores an invalid subject combination is confidently wrong. Deterministic rules gate the model, so the system fails loudly instead of guessing politely.",
  },
  {
    id: "P-03",
    rule: "One rule, computed in one place.",
    note:
      "A test can be submitted three ways, so all three call one pure scoring function — three copies of a marking rule is three different marks for the same paper. The same reasoning put every network call in dwad behind one typed client, after six hand-copied payment clients elsewhere each failed differently.",
  },
  {
    id: "P-04",
    rule: "Secrets never reach the client, and neither does trust.",
    note:
      "Model and payment keys live behind the server, never in a bundled environment variable. The same rule applies to identity: every protected route resolves the caller from their token server-side, in the Express API and in the PHP one. A role you accept from the client is not a role, it's a suggestion.",
  },
  {
    id: "P-05",
    rule: "Ship the interface the value needs.",
    note:
      "The admission predictor's value is the model and the requirements data, so it shipped on Streamlit in hours. Spending a fortnight on a React frontend would have bought nothing a user could feel.",
  },
  {
    id: "P-06",
    rule: "A failure that only writes to a log is a silent failure.",
    note:
      "A week of payment failures left no trace: the provider had no record, nothing hit the database, and the container's log directory was wiped by the next deploy. Anything you'd want to count later needs a row in a table.",
  },
  {
    id: "P-07",
    rule: "A component names a role, never a colour.",
    note:
      "A corporate site I built runs on one token file — brand, ink, paper, type, radii — so changing the brand orange is a single line that moves everywhere at once. A component holding a hex value is a component that will disagree with the next one someone writes.",
  },
];

export const stack = [
  {
    group: "Languages",
    items: [
      { name: "TypeScript", note: "Strict mode, no implicit any" },
      { name: "JavaScript", note: "ES2022+. What InnovaTeam is written in" },
      { name: "PHP", note: "8.3, plain — the API behind Dwad Music" },
      { name: "Python", note: "Data work, model training, Streamlit apps" },
      { name: "SQL", note: "Postgres and MySQL schema design, migrations, RLS" },
    ],
  },
  {
    group: "Interface",
    items: [
      { name: "React", note: "18 and 19, server and client components" },
      { name: "Next.js", note: "App Router, static generation, metadata" },
      { name: "Vite / CRA", note: "SPA builds; CRACO for webpack overrides" },
      { name: "Tailwind / Radix", note: "v3 and v4, with Radix primitives" },
      { name: "CSS Modules", note: "Where a design system is worth hand-writing" },
      { name: "Framer Motion", note: "Staging content on entry, not decoration" },
    ],
  },
  {
    group: "Server & data",
    items: [
      { name: "Node.js / Express", note: "50 route modules, 46 controllers" },
      { name: "PostgreSQL", note: "Raw SQL, 68 versioned migrations, run on deploy" },
      { name: "MySQL / PDO", note: "Prepared statements only, never interpolated" },
      { name: "Supabase", note: "Auth, Storage, row-level security" },
      { name: "Socket.io", note: "Live sessions, group chat, direct messaging" },
      { name: "Redis", note: "Upstash + node-cache, with explicit invalidation" },
      { name: "Docker / nginx", note: "VPS deploys via GitHub Actions" },
    ],
  },
  {
    group: "Models & integrations",
    items: [
      { name: "Google Gemini", note: "Question generation and document parsing" },
      { name: "DeepSeek", note: "Schema-constrained generation via the Vercel AI SDK" },
      { name: "scikit-learn / pandas", note: "Classification, feature engineering" },
      { name: "Paystack", note: "Cards, transfers, wallet, subscriptions, webhooks" },
      { name: "LiveKit / tldraw", note: "Live classes: video and a shared whiteboard" },
    ],
  },
];

export const profile = {
  paragraphs: [
    "I'm a full-stack engineer in Lagos. I studied Information Systems, and I've since shipped in education, commerce, music and client work — including InnovaTeam, an exam-preparation platform for Nigerian students and the tutorial centres that teach them, which I founded and still operate. It's the system I've run longest and learned the most from, but it isn't the whole of what I do.",
    "Most of what I build sits at a decision or a transaction: someone choosing a course, an artist waiting on a payout, a member checking what they've actually earned. That changes how I engineer. A dropped request isn't a line on a dashboard; it's someone who doesn't get paid, or who gives up and closes the tab. So I build defensively — validate at the boundary, keep bundles small, make failure states say something useful, and write the failure down somewhere I can count it later.",
    "I work across the stack because the products I care about need it. I'll design the Postgres schema and its row-level security, write the service that keeps the API key off the client — Express in one project, plain PHP in another — train the classifier, build the token system the interface is drawn from, and then spend just as long on the form someone has to fill in on a cracked screen.",
  ],
  seeking:
    "I'm looking for a frontend or full-stack role on a team that ships to real users and cares about the constraints they're under. Remote or Lagos-based.",
};
