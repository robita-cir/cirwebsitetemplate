# Handover Checklist

Status as of 2026-10-16. This is the document to read first. It explains what the site is, what is finished, what is still placeholder, how to check the work, and what must happen before launch.

## 1. Branches

This repository is the template. Every person, project, event, partner, funding programme, facility and gallery album is a numbered placeholder ("Professor 1", "PhD 1", "Project 1", "Event 1"), and every contact detail uses an example address. The layouts, components and checks are the same ones the centre uses.

To start a real site, copy the repository, then replace the placeholders as described in section 8. Keep the real content out of any public copy until it has been reviewed.

## 2. Quick start for the new team

1. Install Node.js 22.12 or newer. On Windows, use WSL (Ubuntu).
2. From the project folder: `npm install`.
3. `npm run dev`, then open the local address it prints.
4. Read [02-editing-content.md](02-editing-content.md). Change one file, save, and check the page.
5. Run `npm run check` before every commit. It builds the site and validates the HTML.
6. Before launch, run `npm run check:launch`. It must report no blockers (section 8).

If a new page does not appear after you add a route file, stop and restart `npm run dev`.

## 3. Page inventory

| Page | Route | Content source | Notes |
|---|---|---|---|
| Home | `/` | people, projects, research, events, news, partners, funding | Stats, research directions, recent activity, faculty, featured projects and partners |
| About | `/about/` | page copy, facilities | Mission, milestones (timeline), facilities, leadership |
| Research | `/research/` | research, projects, funding, publications | Directions, funded programmes, a featured programme block, projects by area |
| Research direction | `/research/[area]/` | research, projects, publications | One page per direction (four) |
| Research project | `/research/projects/[slug]/` | projects, people | Status, team, abstract, related projects |
| People | `/people/` | people | Four tabs: faculty, research scholars, M.Tech, alumni |
| Profile | `/people/[slug]/` | people, projects | Role, department, interests, biography, projects |
| News | `/news/` | news | Latest list, press and media block |
| News article | `/news/[slug]/` | news | |
| Events | `/events/` | events | Upcoming, workshop series, archive by year |
| Event | `/events/[slug]/` | events | |
| Gallery | `/gallery/` | gallery | Album cards |
| Album | `/gallery/[slug]/` | gallery | Placeholder frames (see section 9) |
| Partners | `/partners/` | partners | Academic and industry, present and former |
| Facilities | `/facilities/` | facilities | |
| Publications | `/publications/` | publications | By year; empty-state note when there are none |
| Documents | `/documents/` | documents | Download or "to be uploaded" |
| Join | `/join/` | openings | Ways to join, open positions, steps, FAQ |
| Support | `/support/` | page copy | Ways to give, tax notes, donor tiers |
| Contact | `/contact/` | site config | Email, telephone, address, enquiry types |
| Search | `/search/` | Pagefind index | Not indexed by search engines |
| Site map | `/sitemap/` | content, hand list | HTML site map |
| Accessibility, privacy, terms | `/accessibility/`, `/privacy/`, `/terms/` | page copy | Drafts; need institute approval |
| Not found | `/404.html` | page copy | Not indexed |
| Styleguide | `/styleguide/` | components | Internal. Delete before launch |
| Feeds and crawl files | `/sitemap.xml`, `/rss.xml`, `/robots.txt` | content | Generated |

## 4. Content checklist

The table gives how many entries the template holds, what to supply, and whether the layout needs the same number. Keep as many entries as the real content needs; the layouts work with any count.

| Collection | Entries in the template | To supply | Notes |
|---|---|---|---|
| People | 62 (7 faculty, 9 research scholars, 3 M.Tech, 14 research alumni, 15 M.Tech alumni, 14 B.Tech alumni) | Name, group, role, department, interests, homepage, portrait, biography | Portraits are the largest gap. Initials show until they are added |
| Research directions | 4 | Descriptions | The four file names are the area ids used by projects (`human-robot-interaction`, `perception-manipulation`, `navigation-planning`, `assistive-health`). Changing them needs a schema change. Projects with `area: other` appear under "Other projects" on the research page |
| Projects | 11 | Title, area, students (exact names), status, summary, abstract | Student names must match person names exactly |
| Events | 9 | Title, kind, series, dates, venue, summary | Upcoming and archive are decided by the date at build time |
| News | 2 (both samples) | Articles and announcements | Shown on the homepage with events |
| Openings | 2 (both samples) | Positions, deadlines, apply address | Close a position by setting `status: closed` |
| Publications | 3 (all samples) | Papers with DOI or link | Most of the list is missing today |
| Facilities | 4 | Name, kind, summary | |
| Documents | 2 (both samples) | PDFs under `public/documents/` | Reports, policies, brochures and forms |
| Partners | 12 | Name, country, kind, status, summary | Mark current, featured partners to show them on the homepage |
| Funded programmes | 4 | Title, funder, partner, amount, period, summary | |
| Gallery albums | 4 | Title, period, description | Photographs are not wired in yet |

### 4.1 Photographs and images

| Image | Where | Size guidance |
|---|---|---|
| Portraits | `public/people/<name>.jpg` and the `photo` field | About 4:5, at least 800 px tall. Use the person's consent |
| Social-sharing image | `public/og-default.png` | 1200 × 630 px |
| Documents | `public/documents/<file>.pdf` and the `file` field | PDF |
| Gallery photographs | Not supported yet (see section 9) | |

## 5. Copy to review

These are written sentences, not content entries. Each needs a read by the centre before launch.

- Homepage: hero title and introduction, section leads, the statistics labels.
- About: mission paragraph, milestone entries, facilities summary, leadership entries.
- Research: the programme block, the list of planned outcomes.
- Join: the four routes, the steps, every FAQ answer.
- Support: ways to give, the tax note, donor tiers.
- Contact: the enquiry types and their descriptions.
- News: the press-and-media block and the press-kit note.
- Gallery: the introduction and the album note.
- Legal: accessibility statement, privacy notice, terms of use. These are drafts and need institute approval.

## 6. Quality checks

### 6.1 What to run

| Command | Purpose | Passing looks like |
|---|---|---|
| `npm run build` | Schema check, pages, search index | Ends with "page(s) built" and no errors |
| `npm run check:html` | html-validate on every built page | No output after the page list, exit code 0 |
| `npm run check` | Build and HTML check | Both pass |
| `npm run check:launch` | Pre-launch list | "No blockers" |
| `npm run check:all` | `check` and `check:launch` | Use before launch |

`check:launch` exits with an error while blockers remain. This is expected on the template until the sample entries, drafts and placeholder settings are replaced.

### 6.2 Accessibility (axe-core, manual run)

axe-core is installed (`devDependencies`). It runs in the browser, so use the preview server:

1. Copy the library into the build output: `cp node_modules/axe-core/axe.min.js dist/axe.min.js`.
2. Build and preview: `npm run build` then `npm run preview`.
3. Open a page (for example `http://localhost:4321/people/`) and open the browser console.
4. Paste this and press Enter:

```js
const s = document.createElement('script');
s.src = '/axe.min.js';
s.onload = async () => {
  const r = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
  console.table(r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })));
};
document.head.append(s);
```

5. An empty table means no violations on that page. Repeat for each template type: home, a people list, a profile, a news article, a research direction, a project, an event, the join page, the contact page, search and the site map.
6. Remove `dist/axe.min.js` after the check (the next build removes it anyway).

### 6.3 Phone width (overflow)

Every route must fit a 390 px phone without sideways scrolling. Run this in the console on the preview server:

```js
const xml = await (await fetch('/sitemap.xml')).text();
const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const failing = [];
for (const r of routes) {
  const f = document.createElement('iframe');
  f.style.cssText = 'width:390px;height:844px;position:fixed;left:-5000px;top:0';
  const loaded = new Promise((res) => (f.onload = res));
  f.src = r;
  document.body.append(f);
  await loaded;
  await new Promise((res) => setTimeout(res, 250));
  if (f.contentDocument.documentElement.scrollWidth > 390) failing.push(r);
  f.remove();
}
failing
```

An empty list (`[]`) is a pass. Also check `/search/`, `/sitemap/` and `/styleguide/` by hand, since they are not in the sitemap.

### 6.4 Results of the round completed on 2026-10-16

| Check | Result |
|---|---|
| Build | 113 pages built; search index built and covering all 113 pages |
| HTML validation (html-validate) | 0 problems on all 113 pages |
| Accessibility (axe-core 4.14, WCAG 2.2 A/AA and best practice) | 0 violations on 25 representative pages after fixes; the homepage, news, people, contact, join, search and site map pages re-checked after the last content change |
| Phone width, all routes | 113 of 113 routes fit 390 px |
| Visual check (desktop) | Homepage, people and contact pages reviewed in the browser. Phone layouts were checked by the overflow test, not by eye |
| Contrast | Text and link colours checked against WCAG AA when the palette was set |

Problems found and fixed in this round:

- The header link's accessible name did not contain the visible "CIR" text (axe `label-content-name-mismatch` on most pages). The monogram is now read as text and the extra label is removed.
- The contact page jumped from the main heading to a third-level heading. The enquiries label is now a second-level heading with the same style.
- The search box had no accessible name. It now has one.
- A link inside running text on the site map was underlined only on hover. It is now always underlined.
- The contact page had a telephone button whose label broke the telephone format rule. It was removed (earlier round).
- The person card and profile had no way to show a portrait, although the card accepted one. A `photo` field is now in the schema, and it is shown on the homepage, the people list and the profile.
- The homepage "Recent activity" block showed events only. It now shows the three most recent items across events and news. The unused `featured` flag on news was removed.
- `npm run check` included the launch check, so it could never pass while samples remained. It now covers build and HTML validation; `npm run check:all` runs the launch check too.

Earlier rounds fixed long-text overflow (breadcrumbs, badges, person cards, the site map at 390 px) with `overflow-wrap`, `min-width: 0` on grid items and a badge max width. Long titles step down in size, and the page `<title>` is shortened to 70 characters.

### 6.5 Stress test

Temporary entries were added to check the layouts with real-world extremes: 41 news items, 32 people (including very long names and missing optional fields), 8 publications, a very long project title and a long event without a venue. The axe and phone-width checks were first run with those entries present, which is how the problems above were found. The entries were then removed, so the site holds only the normal content, and the phone-width check and the main axe pages were run again on that version. To repeat the test, add a handful of long-title entries to each collection and run sections 6.2 and 6.3.

## 7. Benchmark: other centres and companies

The brief asked for sections that other centres and companies use. Three sites were read in this round, plus the lab references in [04-benchmark-references.md](04-benchmark-references.md).

| Site | Type | Sections seen | What the site took from it | Not taken, and why |
|---|---|---|---|---|
| Addverb (addverb.com) | Industrial robotics company | Products and solutions by function, product and industry; blog; press and media; investor relations; whitepapers; policies (quality, energy, sustainability, codes of conduct for vendors and employees); site map; contact by region | Press and media block; policies and whitepapers as documents; site map; blog as news | Investor relations (the funding page covers funding); regional offices (the centre has one address) |
| Agility Robotics (agilityrobotics.com) | Humanoid robotics company | Solutions, industries; company (vision, latest press, investors, careers); resources (insights, executive perspectives, research and analysis, eBooks, videos); separate general and media enquiries; terms and privacy | Careers as a join page and openings; split enquiry types on contact; research and insights as publications and documents; latest press as news | A videos hub (see section 10); a separate investor page |
| RBCCPS (rbccps.org) | Cyber-physical systems centre named in the brief | Not usable. The domain now shows unrelated third-party content, so nothing from it was used | Nothing | Find the centre's official address before any future reference |
| Lab references | Carnegie Mellon RI, Stanford SVL, Berkeley BAIR, TUM MIRMI, JSK Tokyo | People directory with tabs; publications as a main page; audience-based navigation; dated news; partner logos | People tabs (faculty, scholars, M.Tech, alumni); publications page; join page for students; partner strip | Dense mega-menus; default browser typography |

Sections that other sites have, and the decision for each:

| Section | Where it appears | Status here |
|---|---|---|
| Press and media | Addverb, Agility | News page block with a press-kit note. No list of press coverage yet |
| Careers and openings | Agility, Addverb | Join page and openings collection |
| Funding and investors | Addverb, Agility | Support page and funded programmes |
| Insights, research and whitepapers | Agility, Addverb | Publications, documents and news (insight kind) |
| Policies | Addverb | Documents (kind "policy") |
| Sustainability and codes of conduct | Addverb | Documents (kind "policy"). No separate page |
| Videos | Agility | Not built. See section 10 |
| Newsletter sign-up | Most sites | Not built. Needs a mailing-list service; see section 10 |
| Products and solutions | Addverb, Agility | Facilities and research projects. There is no product catalogue |
| Accessibility, privacy and terms | Addverb, Agility | Built as drafts |
| Site map | Addverb | Built |
| Contact by region | Addverb | Not needed; one address |

## 8. Pre-launch checklist

Work through this in order. `npm run check:launch` covers the items marked (auto).

- [ ] (auto) Replace or delete every sample entry (every file with `sample: true`).
- [ ] (auto) Delete `src/pages/styleguide.astro`.
- [ ] (auto) Get the accessibility, privacy and terms pages approved, then remove the "Draft for review" notice.
- [ ] (auto) Set the production domain in `astro.config.mjs` and `src/config/site.ts`. It is used for canonical links, the sitemap and the feed.
- [ ] (auto) The launch check confirms `public/og-default.png` exists. Replace it with the approved social-sharing image (1200 × 630) if the current one is a placeholder.
- [ ] Complete the bracketed placeholders in the legal pages (named in the launch check as warnings).
- [ ] Replace the Robita pointer with the club's live address, in `src/config/site.ts`.
- [ ] Check the telephone number, email, and address in `src/config/site.ts` against the centre's own records.
- [ ] Read every sentence listed in section 5.
- [ ] Add portraits, with consent, to the people who should have them.
- [ ] Add the centre's publications, and check the author lists and DOIs.
- [ ] Add project abstracts where they are ready.
- [ ] Run `npm run check:all`, then section 6.2 and 6.3 on the content as it will be published.
- [ ] Check `/robots.txt`, `/sitemap.xml` and `/rss.xml` show the correct domain.
- [ ] Check that the search page finds content (after `npm run build`, on the preview server).
- [ ] Decide on hosting and any redirects from the old WordPress addresses. Hosting only needs to serve the `dist/` folder.

## 9. Known gaps and placeholders

- **Photographs.** There are no portraits yet (people show initials), and gallery albums show placeholder frames. Portraits work through the `photo` field. Gallery photographs are not wired in: adding them means a small change to `src/pages/gallery/[slug].astro` and a `photos` list in the album schema. Plan this before the first event photographs arrive.
- **Publications and abstracts.** The publications list is mostly empty, and most project abstracts are placeholders.
- **Legal pages.** Drafts. They need the institute's review, and they contain bracketed items to complete.
- **Student club.** The pointer is a placeholder address (`example.org`). Replace it with the club's live address.
- **Domain.** The configured domain is a placeholder (`example.org`). Confirm the real one before launch.
- **Search interface.** Pagefind's default search interface is used. It works, but Pagefind marks it as deprecated in favour of its component interface. Plan the change when there is time.
- **Dev server.** Restart `npm run dev` after adding a new route file.
- **Styleguide.** Internal page for checking components. It is hidden from search engines and must be deleted before launch.
- **Statistics labels.** The homepage statistics are computed from the content, but their labels are written into the page. Change the labels when the content changes.
- **Screenshots.** The template has no screenshots. Capture them at desktop and phone widths once the content is settled.
- **Research directions.** Their names are fixed by the schema (the file names are the ids). The team can change the titles and descriptions freely, but not the ids without a code change.

## 10. Decisions for the team

These were not built on purpose. Each needs a decision before it is added.

| Option | Why it is not built | Ways to add it |
|---|---|---|
| Newsletter sign-up | Needs a service that stores addresses, and the site has no backend | Link to the institute's mailing list, or embed a form from a hosted provider after a privacy review |
| Contact form | Would store personal data | Keep email. A form would need a provider and a privacy-notice update |
| Videos hub | Not requested by the content owners | Add a "videos" collection with a title, date and link, and a page like `/gallery/` |
| Press-coverage list | No source of press items | Add entries to the news collection with `kind: news` and link to the article |
| Gallery photographs | Not supplied | See section 9 |
| Analytics | Not needed for launch; would need a privacy-notice update | Add only after the privacy notice is updated |

## 11. Extending the site

- **Add a field to a collection.** Edit the schema in `src/content.config.ts`, add the field to the page or component that shows it, and add the field to [02-editing-content.md](02-editing-content.md). Run `npm run check`.
- **Add a collection.** Add a `defineCollection` in `src/content.config.ts`, export it in `collections`, create its folder under `src/content/`, and add the page that shows it.
- **Add a page.** Create a file in `src/pages/` that uses `Layout`. Add it to the navigation in `src/config/site.ts` if it is top-level, and to the HTML site map in `src/pages/sitemap/index.astro`.
- **Change the look.** Colours, type and motion are tokens in `src/styles/global.css`. Change them there, not in components.
- **Change a dependency.** Update one package at a time, then run `npm run check` and section 6.2 and 6.3.

## 12. Who to ask

Record the names of the people responsible for each area on the centre's own handover sheet, not in this repository: content owner, technical contact, hosting account, domain registrar, and the approver for the legal pages.
