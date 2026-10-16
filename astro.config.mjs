// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output: no server, no database, no login. Deploy the `dist/` folder anywhere.
// The site has no client framework; the few interactive parts are small scripts in the layout.
export default defineConfig({
  // Production origin. Confirm the final domain before launch (used for canonical URLs, the sitemap and the feed).
  site: 'https://example.org',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    server: {
      // The project lives on a Windows drive (/mnt/d under WSL). File-change events do not reach
      // WSL reliably there, so poll for changes instead.
      watch: { usePolling: true, interval: 300 },
    },
  },
});
