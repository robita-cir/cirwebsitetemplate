import { getCollection } from 'astro:content';
import { site } from '../config/site';

// Every indexable page. Detail pages come from the content collections, so new entries are included automatically.
// Pages that must not be indexed (search, styleguide, 404) are left out.
const staticPaths = [
  '/',
  '/about/',
  '/research/',
  '/people/',
  '/news/',
  '/events/',
  '/partners/',
  '/join/',
  '/facilities/',
  '/publications/',
  '/documents/',
  '/gallery/',
  '/support/',
  '/contact/',
  '/sitemap/',
  '/accessibility/',
  '/privacy/',
  '/terms/',
];

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function GET() {
  const [people, areas, projects, news, events, albums] = await Promise.all([
    getCollection('people'),
    getCollection('research'),
    getCollection('projects'),
    getCollection('news'),
    getCollection('events'),
    getCollection('gallery'),
  ]);

  const paths = [
    ...staticPaths,
    ...people.map((entry) => `/people/${entry.id}/`),
    ...areas.map((entry) => `/research/${entry.id}/`),
    ...projects.map((entry) => `/research/projects/${entry.id}/`),
    ...news.map((entry) => `/news/${entry.id}/`),
    ...events.map((entry) => `/events/${entry.id}/`),
    ...albums.map((entry) => `/gallery/${entry.id}/`),
  ];

  const urls = paths
    .map((path) => `  <url>\n    <loc>${esc(new URL(path, site.url).toString())}</loc>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
