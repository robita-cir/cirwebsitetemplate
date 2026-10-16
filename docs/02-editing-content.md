# Editing the Website Content

Almost everything on the site comes from Markdown files in `src/content/`. Change a file, save it, and the dev server (or the next build) shows the change. There is no admin screen.

Every field is checked against a schema in `src/content.config.ts`. If a value is missing or has the wrong type, the build stops and names the file and the field. Read that message first.

## 1. Where things live

| Folder | What it holds | Shown on |
|---|---|---|
| `src/content/people/` | Faculty, research scholars, M.Tech students, alumni | `/people/`, `/people/[slug]/`, homepage (faculty) |
| `src/content/projects/` | Student and research projects | `/research/`, `/research/[area]/`, `/research/projects/[slug]/`, homepage |
| `src/content/research/` | The four research directions (one file each) | `/research/`, `/research/[area]/`, homepage |
| `src/content/events/` | Workshops, programmes and talks | `/events/`, `/events/[slug]/`, homepage |
| `src/content/news/` | News, announcements and insights | `/news/`, `/news/[slug]/`, homepage (recent activity) |
| `src/content/openings/` | Open and closed positions | `/join/` |
| `src/content/publications/` | Papers, theses and preprints | `/publications/`, research pages |
| `src/content/facilities/` | Equipment and platforms | `/facilities/`, `/about/` |
| `src/content/documents/` | Reports, brochures, policies and forms | `/documents/` |
| `src/content/partners/` | Academic and industry partners | `/partners/`, homepage |
| `src/content/funding/` | Funded programmes | `/research/` |
| `src/content/gallery/` | One file per album | `/gallery/`, `/gallery/[slug]/` |

Site-wide details (name, email, telephone, address, navigation, footer, the Robita pointer) are in `src/config/site.ts`. Text on fixed pages (About, Join, Support, legal pages) is in the page files under `src/pages/`.

## 2. File format

Each entry is one Markdown file. The top block between `---` lines is the data. Text after it, if the collection allows a body, is rendered on the detail page.

```markdown
---
title: Example entry
kind: news
date: 2026-05-01
summary: One or two sentences shown on cards and lists.
---

Optional longer text in Markdown. Headings, lists and links work.
```

File names become the page address. `prof-jane-doe.md` becomes `/people/prof-jane-doe/`. Use lowercase letters, numbers and hyphens.

Dates are written `YYYY-MM-DD`.

## 3. Fields by collection

Required fields have no `?` in the schema. Optional fields can be left out.

### People

```markdown
---
name: Jane Doe
group: faculty
role: Professor
dept: Department of Information Technology
interests: [Human-robot interaction, Learning for control]
homepage: https://example.org/jane-doe
photo: /people/jane-doe.jpg
order: 1
---
```

- `group`: `faculty`, `scholar` (research scholar), `mtech`, `alumni-research`, `alumni-mtech` or `alumni-btech`.
- `order`: lower numbers are listed first within a group. Default 100.
- `photo`: a path to an image under `public/`. Put the file at `public/people/jane-doe.jpg`. Use a portrait about 4:5 in shape, at least 800 px tall. Without a photo the card shows initials.
- `homepage`: must be a full web address starting with `https://`.

### Projects

```markdown
---
title: Learning-based motion planning around people
area: human-robot-interaction
students: [Jane Doe, John Roe]
status: Active
summary: One or two sentences for the project card.
featured: true
order: 1
---
```

- `area`: one of `human-robot-interaction`, `perception-manipulation`, `navigation-planning`, `assistive-health`, `other`.
- `students`: names must match a person's `name` exactly. Matching names become links to their profiles, and the project appears on their profile.
- `status`: `Active`, `Completed` or `Planned`.
- `featured: true` puts the project on the homepage. `order` sorts within an area.
- The body (optional) is the abstract.

### Research directions

Each file is one research direction. The file name must be the area id (for example `navigation-planning.md`), because projects are grouped by it.

```markdown
---
code: NP
title: Navigation and planning
description: What the direction covers, in two or three sentences.
order: 3
---
```

### Events

```markdown
---
title: Workshop on example topic
kind: workshop
series: Annual workshop
date: 2026-03-10
endDate: 2026-03-12
venue: Venue name, city
summary: One or two sentences.
---
```

- `kind`: `workshop`, `programme` or `talk`.
- `series` (optional): events with the same series name are grouped on the events page.
- `endDate` (optional): an event is listed as upcoming until its end date (or start date, if there is no end date) has passed. Older events move to the archive, grouped by year.

### News

```markdown
---
title: Headline
kind: news
date: 2026-05-01
summary: One or two sentences for the list.
featured: false
---

Optional full text.
```

- `kind`: `news`, `announcement` or `insight`.

The homepage's "Recent activity" block shows the three most recent items across events and news, so a new news item appears there automatically.

### Openings

```markdown
---
title: PhD position in example area
type: phd
status: open
deadline: 2026-12-31
summary: What the role is, in two or three sentences.
applyEmail: careers@example.org
order: 1
---
```

- `type`: `phd`, `mtech`, `research-assistant`, `internship`, `faculty`, `staff` or `other`.
- `status`: `open` or `closed`. Open positions are listed first, with an apply link when `applyEmail` is set.

### Publications

```markdown
---
title: Paper title
authors: [Jane Doe, John Roe, Example Author]
venue: Name of the journal or conference
year: 2025
type: journal
doi: 10.0000/example
url: https://example.org/paper
area: navigation-planning
---
```

- `type`: `journal`, `conference`, `workshop`, `preprint`, `thesis` or `other`.
- `authors` must contain at least one name. Keep the order the paper uses.
- `area` (optional) links the paper to a research direction.

### Facilities

```markdown
---
name: Facility name
kind: Robot platform
summary: What it is and what it is used for.
order: 1
---
```

### Documents

```markdown
---
title: Annual report 2025
kind: report
date: 2026-01-15
description: What the document contains, in one or two sentences.
file: /documents/annual-report-2025.pdf
order: 1
---
```

- `kind`: `report`, `brochure`, `policy`, `form` or `other`.
- `file`: a path to a file under `public/`. Leave it out and the page says "file to be uploaded".

### Partners

```markdown
---
name: Partner name
country: India
kind: academic
status: present
summary: Optional one-line description of the collaboration.
featured: true
order: 1
---
```

- `kind`: `academic` or `industry`. `status`: `present` or `former`.
- `featured: true` puts the partner on the homepage. Use it for current partners only.

### Funded programmes

```markdown
---
title: Programme title
funder: Funding body
partner: Partner name
amount: Amount as text, for example "EUR 1.2 million"
period: 2024–2027
summary: One or two sentences.
order: 1
---
```

Keep `amount` as text, so the team writes it the way the funder does.

### Gallery albums

```markdown
---
title: Album title
period: 2026
description: What the album shows, in one or two sentences.
order: 1
---
```

Album pages show six labelled placeholder frames. The album file does not yet carry photographs: the frames show the layout only. Adding photographs needs a small change to `src/pages/gallery/[slug].astro` (see the handover checklist).

## 4. Sample entries

Entries that only show the layout are marked with `sample: true`:

```markdown
sample: true
```

Sample entries carry a "Sample" label on the site. Replace them with real content, or delete the file. `npm run check:launch` lists every sample entry that remains, and the site is not ready to launch while any remain.

## 5. Checking your changes

```bash
npm run dev          # view the changes locally while you edit
npm run check        # build the site and validate the HTML (run before committing)
npm run check:launch # before launch: lists what is still open
```

If `npm run check` fails, the message names the file and the field. Fix that file and run it again.

## 6. Text that is not in the content folders

Some copy is part of a page rather than content. These pages hold their own text:

- `src/pages/index.astro`: homepage introduction and section leads.
- `src/pages/about.astro`: mission, milestones, facilities summary, leadership.
- `src/pages/join.astro`: ways to join, the four steps, the FAQ answers.
- `src/pages/support.astro`: ways to give, tax notes, donor tiers.
- `src/pages/contact.astro`: enquiry types and the address note.
- `src/pages/accessibility.astro`, `privacy.astro`, `terms.astro`: legal drafts. These need the institute's approval.
- `src/config/site.ts`: name, email, telephone, address and the Robita pointer.

Change these files directly. Keep the same structure and check the page in the browser at phone width as well as desktop.
