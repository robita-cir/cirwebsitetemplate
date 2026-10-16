import { getCollection } from 'astro:content';
import { site } from '../config/site';

// RSS 2.0 feed of news and events, newest first.
const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const [news, events] = await Promise.all([getCollection('news'), getCollection('events')]);

  const items = [
    ...news.map((entry) => ({
      title: entry.data.title,
      link: new URL(`/news/${entry.id}/`, site.url).toString(),
      description: entry.data.summary,
      date: entry.data.date,
    })),
    ...events.map((entry) => ({
      title: entry.data.title,
      link: new URL(`/events/${entry.id}/`, site.url).toString(),
      description: entry.data.summary ?? '',
      date: entry.data.date,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 50);

  const itemXml = items
    .map(
      (item) => `    <item>
      <title>${esc(item.title)}</title>
      <link>${esc(item.link)}</link>
      <guid isPermaLink="true">${esc(item.link)}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description>${esc(item.description)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(site.name)}: news and events</title>
    <link>${esc(site.url)}</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
${itemXml}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
