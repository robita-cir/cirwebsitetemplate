# CIR Website Template

A static website template for a research centre, built with [Astro](https://astro.build). The layout and design come from the public site of the Centre for Intelligent Robotics (CIR). Every person, project, event and contact detail is a numbered placeholder.

Every person, project, event, partner and contact detail in this repository is a numbered placeholder, so every page is filled in and can be checked before the real content is added. Replace the placeholders to make the site your own.

There is no backend, login or admin screen. Content is written as Markdown files in `src/content/`. The build writes plain HTML to `dist/`, which any static host can serve.

## Contents

- [Features](#features)
- [Quick start](#quick-start)
- [Commands](#commands)
- [Replacing the placeholders](#replacing-the-placeholders)
- [Project structure](#project-structure)
- [Quality checks](#quality-checks)
- [Documentation](#documentation)
- [Licence](#licence)

## Features

- Pages for a research centre: home, about, research directions, projects, people and profiles, news, events, gallery, partners, facilities, publications, documents, join, support, contact, search, site map and legal pages.
- Content collections with typed schemas. A missing or malformed field stops the build and names the file and the field.
- Search (Pagefind), an RSS feed, an XML sitemap and `robots.txt`, all generated at build time.
- Accessibility built in: a skip link, landmarks, visible focus, reduced-motion support and text colours that meet WCAG 2.2 AA.
- Layouts from phone width to desktop, and a print stylesheet.
- Sample entries marked `sample: true`, which a launch check lists until they are replaced.

## Quick start

**Requirements:** Node.js 22.12 or newer. On Windows, run the commands from WSL (Ubuntu).

```bash
npm install
npm run dev
```

Open <http://localhost:4321>. Search only works on a built site, so to try it run `npm run build` and then `npm run preview`.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts a local preview with live reload |
| `npm run build` | Builds `dist/` and the search index |
| `npm run preview` | Serves the built site from `dist/` |
| `npm run check` | Builds the site and validates the HTML of every page |
| `npm run check:launch` | Lists what must be done before launch. Exits with an error while blockers remain |
| `npm run check:all` | Runs `check`, then `check:launch` |

## Replacing the placeholders

1. Set the centre's details in `src/config/site.ts`: name, institute, email, telephone, address, and the link to the student club.
2. Set the production domain in `astro.config.mjs` and in `src/config/site.ts`.
3. Replace or delete each entry in `src/content/`. Every placeholder has `sample: true`. [docs/02-editing-content.md](docs/02-editing-content.md) lists the fields for each collection.
4. Add portraits to `public/people/` and set the `photo` field in each person file.
5. Replace `public/og-default.png`, the 1200 × 630 image shown when the site is shared.
6. Rewrite the page copy marked as placeholder in `src/pages/`.
7. Have the accessibility, privacy and terms pages reviewed, then remove their "Draft for review" notice.
8. Delete `src/pages/styleguide.astro`, the internal component page.
9. Run `npm run check:all` until it reports no blockers.

The full list, with the content checklist and the launch checklist, is in [docs/03-handover-checklist.md](docs/03-handover-checklist.md).

## Project structure

```
.
├── astro.config.mjs          Astro configuration: site URL and dev server
├── package.json
├── public/                   Files served as they are: favicon, social image, portraits, documents
├── scripts/
│   └── launch-check.mjs      Pre-launch checklist (npm run check:launch)
├── src/
│   ├── components/           Reusable pieces: header, footer, cards, headings, figures
│   ├── config/site.ts        Site name, contact details, navigation, footer, student club link
│   ├── content/              All editable content: one folder per collection, Markdown files
│   ├── content.config.ts     Collection schemas: the fields each entry has
│   ├── layouts/Layout.astro  Page shell: head and meta tags, header, footer, scripts
│   ├── lib/format.ts         Date and label helpers
│   ├── pages/                One file per page; [slug] and [area] create the detail pages
│   └── styles/global.css     Design tokens, typography, motion and print styles
└── docs/                     Documentation
```

## Quality checks

| Check | How |
|---|---|
| HTML validity | `npm run check:html` (runs as part of `npm run check`) |
| Launch readiness | `npm run check:launch` |
| Accessibility | axe-core, run in the browser on the preview server. Method in [docs/03-handover-checklist.md](docs/03-handover-checklist.md), section 6.2 |
| Phone width | A script that loads every page at 390 px and reports any sideways scrolling. Method in [docs/03-handover-checklist.md](docs/03-handover-checklist.md), section 6.3 |

## Documentation

- [docs/03-handover-checklist.md](docs/03-handover-checklist.md): start here. Quick start for a new team, content checklist, quality checks, benchmark, and the launch checklist
- [docs/02-editing-content.md](docs/02-editing-content.md): how to add and change people, projects, events, news and the other collections
- [docs/01-site-overview.md](docs/01-site-overview.md): what the site is, the technology, the design system, every page and every component
- [docs/04-benchmark-references.md](docs/04-benchmark-references.md): design references from other research labs and companies

## Built with

[Astro](https://astro.build) · [Tailwind CSS](https://tailwindcss.com) · [Pagefind](https://pagefind.app) · [Fontsource](https://fontsource.org) · [html-validate](https://html-validate.org) · [axe-core](https://github.com/dequelabs/axe-core)

## Licence

No licence file is included yet. The centre should choose a licence before the code is reused outside the centre.
