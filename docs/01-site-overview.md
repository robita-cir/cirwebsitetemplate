# CIR Website: Overview

This document describes what the site is, how it is built, and where each part lives. For the handover steps, the content checklist and the launch checklist, read [03-handover-checklist.md](03-handover-checklist.md). For editing content, read [02-editing-content.md](02-editing-content.md).

## 1. What it is

A public website for the Centre for Intelligent Robotics: research directions, projects, people, events, news, partners, facilities, funding, publications, documents, a gallery, and the pages needed to join, support, or contact the centre.

It is static. Every page is built to plain HTML at build time. There is no database, no login, no admin screen, and no form that stores data. Enquiries go by email.

## 2. Technology

| Part | Choice | Why |
|---|---|---|
| Site generator | Astro 7 (static output) | Plain HTML, fast, no client framework needed |
| Content | Astro content collections, Markdown with typed frontmatter (Zod) | Errors name the file and the field at build time |
| Styling | Tailwind CSS 4 through the Vite plugin, with design tokens in `global.css` | Tokens in one place; utilities in templates |
| Fonts | Fontsource (self-hosted): Source Serif 4, Inter, JetBrains Mono | No third-party font requests |
| Search | Pagefind (built after Astro) | Works on a static host, no search server |
| Feeds | RSS 2.0 (news and events), sitemap.xml, robots.txt | Generated at build time |
| Scripts in the browser | Plain JavaScript in `Layout.astro` (about 60 lines) | Scroll reveal, count-up, skip-link focus |
| Quality | html-validate, axe-core (manual run), a launch checklist script | See section 8 |

Dependencies are listed in `package.json`. The site has no React, Motion, GSAP or Lenis. An earlier version used them; they were removed to keep the site simple to maintain.

## 3. Project structure

```
src/
  config/site.ts              site name, contact, nav, footer, Robita pointer
  content.config.ts           every collection and its fields
  content/
    people/                   one file per person
    projects/                 one file per project
    research/                 one file per research direction (four)
    events/                   workshops, programmes and talks
    news/                     news, announcements and insights
    openings/                 PhD, M.Tech, internship, staff and faculty openings
    publications/             papers, theses and preprints
    facilities/               equipment and platforms
    documents/                reports, brochures, policies and forms
    partners/                 academic and industry partners
    funding/                  funded programmes
    gallery/                  photo albums (one file per album)
  layouts/Layout.astro        document head, skip link, header, footer, scripts
  components/                 reusable components (section 5)
  pages/                      one file per page (section 6)
  lib/format.ts               date formatting and sorting helpers
  styles/global.css           tokens, base typography, components, motion, print
public/                       favicon, social-sharing image
scripts/launch-check.mjs      pre-launch checklist (npm run check:launch)
docs/                         documentation
```

## 4. Design system

### 4.1 Colour (light theme only)

Colours are CSS custom properties on `:root` in `global.css` and are exposed to Tailwind as `paper`, `band`, `ink`, `muted`, `line`, `accent`, `on-accent`, `brand` and `highlight`.

| Token | Value | Use |
|---|---|---|
| paper | `#ffffff` | page background |
| band | `#f6f7f9` | alternating bands, cards, placeholders |
| ink | `#101030` | headings and body text |
| muted | `#4a4f66` | secondary text (meets AA on paper and band) |
| line | `#d9dce3` | borders and rules |
| accent | `#17766a` | links, eyebrows, primary buttons (text-safe teal) |
| brand | `#30a090` | decoration only, never for text |
| highlight | `#8a5a12` | badges for funding and highlights |

The site sets `color-scheme: light` and does not switch to a dark theme.

### 4.2 Typography

- Display (headings): Source Serif 4, weight 500, tight letter spacing.
- Body and interface: Inter.
- Labels (eyebrows, dates, badges, metadata): JetBrains Mono, uppercase, letter-spaced.
- Heading sizes use `clamp()` so they scale between phone and desktop. Long page titles step down in size automatically (`PageHero`).
- Long words and names wrap (`overflow-wrap: anywhere` on the body; grid and flex items allow shrinking), so nothing forces a horizontal scroll on a phone.

### 4.3 Layout

- Content width: `max-w-page` (76 rem). Side gutters: 1.25 rem on phones, 2 rem from small screens up.
- Sections: a `SectionHeader` (number, label, title, lead) followed by a grid of cards, rows or lists.
- Cards and rows have square corners and 1 px rules, which gives the academic, low-decoration look.

### 4.4 Motion

- Scroll reveal: elements with `data-reveal` fade in once they enter the viewport (IntersectionObserver).
- Hero entrance: `.rise` and `.rise-d*` classes stagger the first elements on load.
- Count-up: `data-count` and `data-suffix` on a statistic count from 0 to the value over 1.6 s when visible.
- The homepage manipulator figure is a static SVG drawn from computed joint angles. It has no animation.
- Reduced motion: when `prefers-reduced-motion` is set, nothing animates; statistics show their final value. Without JavaScript, content is visible.

### 4.5 Print

A print stylesheet hides the header, navigation, footer, sub-navigation and anything marked `data-print-hide`. Text is set in black on white at 11 pt, and external links print their address.

## 5. Components

| Component | Purpose |
|---|---|
| `UtilityBar` | Top strip with the institute link, email and telephone |
| `Header` | Sticky header: wordmark, primary navigation, the Robita pointer, and a mobile menu |
| `Wordmark` | Monogram and the centre name |
| `Footer` | Brand block, Robita pointer, contact details and the footer link groups |
| `PageHero` | Eyebrow, title (size steps for long titles), lead text, breadcrumbs, and an optional slot |
| `SectionHeader` | Numbered section heading with label, title and lead |
| `SubNav` | Sticky in-page navigation (used on People and Research) |
| `Breadcrumb` | Breadcrumb trail (hidden in print) |
| `Button` | Primary, outline and link buttons |
| `Badge` | Neutral, accent and highlight tags (`max-w-full`, so long labels wrap) |
| `Card` | Generic bordered card |
| `Stat` | Count-up statistic |
| `ResearchArea` | A research direction with examples |
| `ProjectRow` | A project with area, status and team |
| `PersonCard` | Portrait (or initials), name, role, department and interests |
| `EventCard` | Date block, kind badge, venue and summary |
| `NewsItem` | Dated news or announcement row |
| `PublicationItem` | Year and type, authors, venue and DOI |
| `PartnerMark` | Partner name, country and summary (a text tile until logos are supplied) |
| `Timeline` | Dated milestones |
| `ManipulatorFigure` | Technical figure on the homepage |
| `ProseWrap` | Typography wrapper for Markdown bodies |
| `EmptyState` | Dashed box for content not yet available. It says what is missing, rather than hiding the section |
| `SampleTag` | "Sample" label on placeholder entries |

## 6. Pages

| Route | Source | What it shows |
|---|---|---|
| `/` | `index.astro` | Hero, key figures, research directions, recent activity (events and news), faculty, featured projects, featured partners |
| `/about/` | `about.astro` | Mission, milestones, facilities, leadership |
| `/research/` | `research.astro` | Research directions, funded programmes, featured programme, projects by area, recent publications |
| `/research/[area]/` | `research/[area].astro` | One page per research direction with its projects and publications |
| `/research/projects/[slug]/` | `research/projects/[slug].astro` | Project detail: status, students, abstract, related projects |
| `/people/` | `people.astro` | Faculty, research scholars, M.Tech students and alumni (tabs in the sub-navigation) |
| `/people/[slug]/` | `people/[slug].astro` | Profile: role, department, interests, biography, student projects |
| `/news/` | `news/index.astro` | Latest news, announcements and insights; press and media block |
| `/news/[slug]/` | `news/[slug].astro` | Article detail |
| `/events/` | `events.astro` | Upcoming events, workshop series, archive by year |
| `/events/[slug]/` | `events/[slug].astro` | Event detail |
| `/gallery/` | `gallery.astro` | Album cards |
| `/gallery/[slug]/` | `gallery/[slug].astro` | Album with placeholder frames until photographs are supplied |
| `/partners/` | `partners.astro` | Academic and industry partners, current and former |
| `/facilities/` | `facilities.astro` | Equipment and platforms |
| `/publications/` | `publications.astro` | Publications by year, with a note when the list is empty |
| `/documents/` | `documents.astro` | Downloadable documents, or "to be uploaded" |
| `/join/` | `join.astro` | Ways to join, open positions, steps, FAQ |
| `/support/` | `support.astro` | Ways to support the centre, tax notes, donor tiers |
| `/contact/` | `contact.astro` | Email, telephone, address, enquiry types |
| `/search/` | `search.astro` | Search (noindex) |
| `/sitemap/` | `sitemap/index.astro` | HTML site map |
| `/accessibility/`, `/privacy/`, `/terms/` | legal pages | Drafts marked "Draft for review" until approved |
| `/404.html` | `404.astro` | Not-found page (noindex) |
| `/styleguide/` | `styleguide.astro` | Internal component page (noindex). Delete before launch |
| `/sitemap.xml`, `/robots.txt`, `/rss.xml` | `*.ts` endpoints | Generated |

`robots.txt` disallows `/search/` and `/styleguide/`. The XML sitemap and the feed are built from the content, so new entries appear automatically. The HTML site map (`/sitemap/`) is a hand-maintained list of the main pages, so add new top-level pages there.

## 7. Content

Content is described in [02-editing-content.md](02-editing-content.md). In short, each collection has a schema in `src/content.config.ts`. The schema defines the fields, their types and which are required. A file that breaks the schema stops the build and names the file and the field.

Every collection can carry `sample: true` on an entry. Sample entries show the layout working and are labelled "Sample" on the site. `npm run check:launch` lists them, and they must be replaced or deleted before launch.

## 8. Quality

| Check | How | What it covers |
|---|---|---|
| Build | `npm run build` | Schema errors, broken links to content, page generation, search index |
| HTML | `npm run check:html` (html-validate) | Valid markup on every built page |
| Accessibility | axe-core in the browser (method in the handover) | WCAG 2.2 A and AA rules, best practice |
| Contrast | Checked when the palette was set | Text and link colours meet WCAG AA |
| Responsive | Overflow check at 390 px (method in the handover) | No horizontal scroll on any route |
| Pre-launch | `npm run check:launch` | Samples, draft notices, the styleguide, the domain, the social image |

Accessibility features: a skip link that moves focus into the content; header, navigation, main and footer landmarks; a visible focus outline; reduced-motion support; portraits carry the person's name as alt text and placeholder frames are labelled; the search box has an accessible name.

## 9. Known gaps and placeholders

- **Photographs.** No portraits or event photographs are supplied yet. People show initials. Gallery albums show labelled placeholder frames. Portraits can be added through the `photo` field (see the editing guide).
- **Publications and abstracts.** Publication entries are samples, and most project abstracts are placeholders.
- **Legal pages.** Accessibility, privacy and terms are drafts. They need approval by the institute.
- **Robita.** The pointer goes to the club's GitHub repository. Replace it with the live address when the club site is deployed.
- **Domain.** The configured domain is the one in `astro.config.mjs` and `src/config/site.ts`. Confirm it before launch.
- **Search interface.** The search page uses Pagefind's default interface. It works, but Pagefind marks that interface as deprecated in favour of its component interface. Plan the migration when the team has time.
- **Dev server.** After adding a new route file, restart `npm run dev` if the new page does not appear.
- **Not built, by decision:** newsletter sign-up and contact forms (both need a service that stores data; the site has no backend), a videos hub, and a press-coverage list. The handover explains the options.

## 10. Running the project

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # writes dist/ and the search index
npm run preview        # serves dist/ locally
```

Use WSL on Windows. Node.js 22.12 or newer is required.
