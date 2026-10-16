import { site } from '../config/site';

// Search, the styleguide and the 404 page are kept out of search engines. Everything else is open.
export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /search/',
    'Disallow: /styleguide/',
    '',
    `Sitemap: ${new URL('/sitemap.xml', site.url).toString()}`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
