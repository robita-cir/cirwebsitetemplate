// Launch readiness check. Run with: npm run check:launch
//
// It prints a checklist and exits with code 1 while any BLOCKER is open, so it can gate a release.
// WARN items are worth reading but do not stop the release.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');

const blockers = [];
const warnings = [];
const passes = [];

// Collect every Markdown file under src/content.
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith('.md') ? [full] : [];
  });
}

// 1. Sample entries left in the content.
const contentRoot = join(root, 'src', 'content');
const samples = walk(contentRoot).filter((file) => {
  const text = readFileSync(file, 'utf8');
  const frontmatter = text.split(/^---\s*$/m)[1] ?? '';
  return /^sample:\s*true\s*$/m.test(frontmatter);
});
if (samples.length > 0) {
  blockers.push(`${samples.length} sample entries are still in the content. Replace or delete them:`);
  samples.forEach((file) => blockers.push(`    ${relative(root, file)}`));
} else {
  passes.push('No sample entries remain in src/content.');
}

// 2. Internal pages that must not ship.
if (existsSync(join(root, 'src', 'pages', 'styleguide.astro'))) {
  blockers.push('src/pages/styleguide.astro is still present. Delete it before launch.');
} else {
  passes.push('Styleguide page removed.');
}

// 3. Legal pages must be reviewed by the institute.
const legalPages = ['src/pages/accessibility.astro', 'src/pages/privacy.astro', 'src/pages/terms.astro'];
for (const page of legalPages) {
  const text = read(page);
  if (text.includes('Draft for review')) {
    blockers.push(`${page} is marked "Draft for review". Get the institute's approval, then remove the notice.`);
  }
  const open = text.match(/\[[A-Za-z][^\]]*\]/g) ?? [];
  if (open.length > 0) {
    warnings.push(`${page} has ${open.length} bracketed placeholder(s) to complete: ${open.slice(0, 3).join(' ')}${open.length > 3 ? ' …' : ''}`);
  }
}

// 4. Site configuration.
const siteConfig = read('src/config/site.ts');
const siteUrl = siteConfig.match(/url:\s*'([^']+)'/)?.[1] ?? '';
if (/localhost|example\./.test(siteUrl) || siteUrl === '') {
  blockers.push(`site.url is "${siteUrl}". Set the production domain in src/config/site.ts.`);
} else {
  warnings.push(`site.url is ${siteUrl}. Confirm this is the final domain (it is used for canonical links, the sitemap and the feed).`);
}
const robitaUrl = siteConfig.match(/robita[\s\S]*?url:\s*'([^']+)'/)?.[1] ?? '';
if (robitaUrl.includes('github.com') || /example\./.test(robitaUrl)) {
  warnings.push('The student club pointer still goes to a repository or placeholder address. Replace it with the club site’s live address.');
} else {
  passes.push('Robita pointer uses a live address.');
}

// 5. Social-sharing image.
if (existsSync(join(root, 'public', 'og-default.png'))) {
  passes.push('Default social-sharing image present (public/og-default.png).');
} else {
  blockers.push('public/og-default.png is missing. Generate it (see docs/06-handover-checklist.md).');
}

// 6. Search index (created by the build).
if (existsSync(join(root, 'dist', 'pagefind', 'pagefind-ui.js'))) {
  passes.push('Search index built (dist/pagefind).');
} else {
  warnings.push('No search index in dist/. Run npm run build before checking the site.');
}

// 7. Photographs and portraits are placeholders until supplied.
const people = walk(join(contentRoot, 'people'));
const withPhoto = people.filter((file) => /^photo:/m.test(readFileSync(file, 'utf8'))).length;
warnings.push(`${people.length - withPhoto} of ${people.length} people entries have no portrait (initials are shown).`);

// Report.
const line = (text) => console.log(text);
line('CIR website: launch check');
line('');
if (passes.length) {
  line('Passed');
  passes.forEach((item) => line(`  [x] ${item}`));
  line('');
}
if (warnings.length) {
  line('Warnings (read before launch)');
  warnings.forEach((item) => line(`  [ ] ${item}`));
  line('');
}
if (blockers.length) {
  line('Blockers (must be fixed before launch)');
  blockers.forEach((item) => line(`  [ ] ${item}`));
  line('');
  line(`${blockers.length} blocker line(s). Not ready to launch.`);
  process.exit(1);
}
line('No blockers. Work through the warnings, then launch.');
