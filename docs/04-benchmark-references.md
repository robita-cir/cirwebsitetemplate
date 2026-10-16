# Robotics Lab References

Date: 2026-10-15
Method: live pages opened in the in-app browser. Fonts and colours read from the rendered DOM, not from screenshots (screenshots failed on most sites). Several sites blocked automated access, and those are listed separately.

---

## 1. Which labs were read

| Lab | Site | Body font | Heading font | Link colour | Navigation (as seen) | Worth borrowing | Avoid |
|---|---|---|---|---|---|---|---|
| CMU Robotics Institute | ri.cmu.edu | Open Sans | Roboto | Cardinal red `#C41230` | About, People (All, Faculty, Special Faculty, Postdocs), Maps, Branding | People directory filtered by role | Dense university mega-menu; generic look |
| Stanford Vision and Learning Lab | svl.stanford.edu | Open Sans | Open Sans | Cardinal `#B1060E` | Home, People, Research, Publications | Publications and people as the core; four-item nav | Very plain; little visual hierarchy |
| UC Berkeley BAIR | bair.berkeley.edu | Inter | Inter | Berkeley blue `#003262` | About, Blog, People, Faculty, Staff, Students and Alumni, Resources, Admissions, Courses, Software | Modern sans; audience-based sections (Students and Alumni, Admissions) | Ten top-level items is a lot |
| Munich MIRMI (TUM) | mirmi.tum.de | not read (script failed) | not read | not read | page loads | needs a manual check | |
| JSK Lab, University of Tokyo | jsk.t.u-tokyo.ac.jp | Times New Roman (browser default) | none | default | no nav found; 28 images | research shown through images | Unstyled legacy look: what to avoid |

### Could not be read in this session
- **ETH Zurich RSL** (rsl.ethz.ch): page rendered blank. An earlier subagent read its text: a dated news list with short summaries, a footer with accessibility statement and imprint.
- **MIT CSAIL** (csail.mit.edu): 403 Forbidden.
- **Georgia Tech IRIM** (irim.gatech.edu): navigation denied.
- **UPenn GRASP** (grasp.upenn.edu): page loaded, but no styles or body content could be read.
- **Oxford Robotics Institute** (robotics.ox.ac.uk): navigation failed. An earlier subagent read the Oxford Engineering site: a full-width lab photo hero, and an award and partner logo strip near the footer.

---

## 2. What the reachable labs have in common

1. **Credibility comes from content, not effects.** None of them uses motion or display type. People lists, publications, dated news and funder logos carry the page.
2. **Sans-serif body text everywhere.** Inter, Open Sans and Roboto dominate. Our Source Serif 4 headings are a deliberate difference. Keep them, but keep them restrained.
3. **Link colour is the institution's colour.** Cardinal red, Berkeley blue, Stanford cardinal. The centre's teal follows this pattern.
4. **Navigation is organised by audience.** BAIR groups items for students, admissions and courses. CIR's current plan (About, People, Research, Events, Partners, Gallery, Contact) has no audience entry point.
5. **People directories are filterable.** CMU lists All, Faculty, Special Faculty and Postdocs as tabs.

---

## 3. Decisions these references suggest for CIR

| Idea | Source | Action |
|---|---|---|
| Add a "Join" or "Students" entry point | BAIR | Add a page for prospective PhD, M.Tech and B.Tech students and interns, linking to the student club site |
| Filterable people directory | CMU RI | People page with tabs: Faculty, Scholars, M.Tech, Alumni |
| Publication list as a first-class page | SVL | Add a Publications page (data needed from the centre) |
| Dated news list | ETH RSL, observed earlier | Already in the design system (NewsItem) |
| Partner and funder logo strip | Oxford, observed earlier | PartnerMark component; swap text tiles for logos when collected |
| Avoid legacy default styling | JSK Tokyo | Keep the custom tokens; no browser-default fonts |

---

## 4. Second round: centres and companies (2026-10-16)

A second round read the homepage navigation and section headings of two companies (Addverb and Agility Robotics). The rbccps.org address was also checked, but it now shows unrelated third-party content, so it was not used. The full comparison, with the sections each site has and what was taken from it, is in [03-handover-checklist.md](03-handover-checklist.md), section 7.

## 5. Ranking note

No authoritative lab-level ranking was found. ShanghaiRanking's 2025 subject table includes Robotic Science and Engineering, but it ranks universities, not labs, so it cannot isolate CMU RI or ETH RSL. The list above reflects reputation and visibility, not a measured rank.

Sources used for the ranking note:
- [ShanghaiRanking subject ranking, robotics 2025](https://xuanxiao.org/en/rankings/arwu/subject/robotics/2025) (third-party mirror)
- [CMU Robotics Institute](https://www.ri.cmu.edu/) · [Stanford Vision and Learning Lab](https://svl.stanford.edu/) · [BAIR](https://bair.berkeley.edu/) · [MIRMI](https://www.mirmi.tum.de/) · [JSK Lab](https://www.jsk.t.u-tokyo.ac.jp/)
