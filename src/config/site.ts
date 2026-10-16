/*
 * Site-wide settings. Change values here, not in components.
 */

export const site = {
  name: 'Centre for Intelligent Robotics',
  shortName: 'CIR',
  institute: 'Institute name',
  // Short institute name for the header and eyebrows, and the institute's own website.
  instituteShort: 'Institute name',
  instituteUrl: 'https://example.org/',
  // Production origin. Confirm the final domain before launch (canonical URLs, sitemap, feeds).
  url: 'https://example.org',
  description:
    'Centre for Intelligent Robotics (CIR), Institute name: research, projects, people, events and opportunities in intelligent robotics.',
  email: 'centre@example.org',
  // The tel: link uses the plain number. The displayed number uses non-breaking hyphens, so it stays on one line when it wraps.
  phone: '+00-000-000-0000',
  phoneHtml: '+00&#8209;000&#8209;000&#8209;0000',
  address: ['Building name, campus', 'Institute name, City, State 000000'],
  // Social profiles are added here when the centre has them. Empty means none are shown.
  social: [] as { label: string; href: string }[],
} as const;

/*
 * Pointer to the student club site. The club site is a separate application;
 * this site only links to it. Replace the URL with the club's live address once it is deployed.
 */
export const robita = {
  label: 'Student club',
  url: 'https://example.org/student-club',
} as const;

// Primary navigation (header). Keep it to about eight items.
export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Research', href: '/research/' },
  { label: 'People', href: '/people/' },
  { label: 'News', href: '/news/' },
  { label: 'Events', href: '/events/' },
  { label: 'Partners', href: '/partners/' },
  { label: 'Join', href: '/join/' },
  { label: 'Contact', href: '/contact/' },
] as const;

// Footer columns. Each column is a heading and its links.
export const footerGroups = [
  {
    title: 'Centre',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Facilities', href: '/facilities/' },
      { label: 'Support the centre', href: '/support/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'Research areas', href: '/research/' },
      { label: 'Student projects', href: '/research/#projects' },
      { label: 'Funded programmes', href: '/research/#funding' },
      { label: 'Publications', href: '/publications/' },
    ],
  },
  {
    title: 'People',
    links: [
      { label: 'Faculty and students', href: '/people/' },
      { label: 'Alumni', href: '/people/#alumni' },
      { label: 'Join the centre', href: '/join/' },
      { label: 'Partners', href: '/partners/' },
    ],
  },
  {
    title: 'News and media',
    links: [
      { label: 'News', href: '/news/' },
      { label: 'Events', href: '/events/' },
      { label: 'Gallery', href: '/gallery/' },
      { label: 'Documents', href: '/documents/' },
    ],
  },
  {
    title: 'This site',
    links: [
      { label: 'Search', href: '/search/' },
      { label: 'Site map', href: '/sitemap/' },
      { label: 'Accessibility', href: '/accessibility/' },
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms of use', href: '/terms/' },
    ],
  },
] as const;
