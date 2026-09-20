# michaelbalogun.dev

Portfolio for Michael Balogun — frontend & full-stack engineer, Lagos.

Built as a drawing set rather than a landing page: a drafting grid, a title block,
numbered sheets, and case studies that lead with decisions and trade-offs instead of
screenshots.

## Stack

| Concern    | Choice                                               |
| ---------- | ---------------------------------------------------- |
| Framework  | Next.js 16 (App Router), fully static                |
| Language   | TypeScript, strict                                   |
| Styling    | Hand-written CSS Modules + custom properties         |
| Motion     | CSS transitions driven by one IntersectionObserver   |
| Type       | Newsreader (display), IBM Plex Mono (everything else) |

No UI kit, no CSS framework, no animation library. Every page is prerendered at build time
(static rendering via the App Router — not `output: "export"`, so it can gain a route handler
later without a rewrite).

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # prerenders 7 routes (home, 5 case studies, 404)
```

## Structure

```
src/
  app/
    layout.tsx           root shell, fonts, metadata, pre-paint theme script
    page.tsx             the sheet index (home)
    work/[slug]/         case study template, statically generated per project
  components/            one component + one CSS module each
  content/
    site.ts              identity, positioning, principles, stack schedule
    projects.ts          case study data — the only file worth editing often
```

Content and presentation are deliberately separate: adding a project means adding an
object to `content/projects.ts`, and the route, metadata and index entry follow.

## Themes

Two: `paper` (drafting paper, default) and `blueprint` (dark). The choice is stored in
`localStorage` and applied before first paint, so there is no flash. The drafting grid
can be switched off independently.

## Accessibility & motion

- Reveal animations are armed only when `prefers-reduced-motion` is not set; without JS
  the content renders visible rather than hidden.
- The cursor coordinate readout and scroll rule are decorative, `aria-hidden`, and only
  render for fine pointers on wide viewports.
- Skip link, focus-visible outlines, and semantic `dl`/`ol` markup throughout.
