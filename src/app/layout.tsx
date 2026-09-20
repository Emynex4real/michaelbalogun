import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import { site, statement } from "@/content/site";
import Masthead from "@/components/Masthead";
import Colophon from "@/components/Colophon";
import ScrollRule from "@/components/ScrollRule";
import CoordReadout from "@/components/CoordReadout";
import RevealEngine from "@/components/RevealEngine";
import "./globals.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: statement.lede,
  authors: [{ name: site.name, url: site.links.github }],
  keywords: [
    "Michael Balogun",
    "frontend engineer",
    "full-stack engineer",
    "React",
    "TypeScript",
    "Next.js",
    "Lagos",
    "Nigeria",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    title: `${site.name} — ${site.role}`,
    description: statement.headline,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Innovateamm",
    title: `${site.name} — ${site.role}`,
    description: statement.headline,
  },
  // No `robots` key on purpose. Indexing is already the default without one,
  // and declaring it here made every route inherit "index, follow" — including
  // the 404, which then shipped a tag contradicting Next's own noindex.
};

/** Applies the stored theme before first paint so the page never flashes. */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'blueprint' : 'paper';
    document.documentElement.setAttribute('data-theme', t);
    if (localStorage.getItem('grid') === 'off') document.documentElement.setAttribute('data-grid', 'off');
    // Arm the reveal animation before first paint, so nothing flashes in and back out.
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.setAttribute('data-reveal-ready', '');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="paper" className={`${mono.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Masthead />
        <main id="main">{children}</main>
        <Colophon />
        <ScrollRule />
        <CoordReadout />
        <RevealEngine />
      </body>
    </html>
  );
}
