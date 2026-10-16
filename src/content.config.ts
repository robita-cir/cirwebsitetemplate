import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every collection is one folder of Markdown files. Frontmatter holds the data; a Markdown body is optional
// and is rendered on detail pages (profiles, projects, news, events, albums).
//
// `sample: true` marks placeholder entries that show the template working. Replace or delete them before launch.
// `npm run check:launch` lists any that remain.
//
// The schemas reject bad data at build time, so an error names the file and the field.

const areaIds = ['human-robot-interaction', 'perception-manipulation', 'navigation-planning', 'assistive-health', 'other'] as const;

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    group: z.enum(['faculty', 'scholar', 'mtech', 'alumni-research', 'alumni-mtech', 'alumni-btech']),
    role: z.string().optional(),
    dept: z.string().optional(),
    interests: z.array(z.string()).default([]),
    homepage: z.string().url().optional(),
    // Portrait path under public/, for example /people/jane-doe.jpg. Initials are shown until one is added.
    photo: z.string().optional(),
    order: z.number().default(100),
    sample: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    area: z.enum(areaIds),
    students: z.array(z.string()),
    status: z.enum(['Active', 'Completed', 'Planned']).optional(),
    summary: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    sample: z.boolean().default(false),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/research' }),
  schema: z.object({
    code: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number().default(100),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['workshop', 'programme', 'talk']),
    series: z.string().optional(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    venue: z.string().optional(),
    summary: z.string().optional(),
    sample: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['news', 'announcement', 'insight']),
    date: z.coerce.date(),
    summary: z.string(),
    sample: z.boolean().default(false),
  }),
});

const openings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/openings' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['phd', 'mtech', 'research-assistant', 'internship', 'faculty', 'staff', 'other']),
    status: z.enum(['open', 'closed']),
    deadline: z.coerce.date().optional(),
    summary: z.string(),
    applyEmail: z.string().email().optional(),
    order: z.number().default(100),
    sample: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    year: z.number().int(),
    type: z.enum(['journal', 'conference', 'workshop', 'preprint', 'thesis', 'other']),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    area: z.enum(areaIds).optional(),
    sample: z.boolean().default(false),
  }),
});

const facilities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/facilities' }),
  schema: z.object({
    name: z.string(),
    kind: z.string(),
    summary: z.string(),
    order: z.number().default(100),
    sample: z.boolean().default(false),
  }),
});

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documents' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['report', 'brochure', 'policy', 'form', 'other']),
    date: z.coerce.date().optional(),
    description: z.string(),
    file: z.string().optional(),
    order: z.number().default(100),
    sample: z.boolean().default(false),
  }),
});

const partners = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/partners' }),
  schema: z.object({
    name: z.string(),
    country: z.string().optional(),
    kind: z.enum(['academic', 'industry']),
    status: z.enum(['present', 'former']),
    summary: z.string().optional(),
    order: z.number().default(100),
    featured: z.boolean().default(false),
  }),
});

const funding = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/funding' }),
  schema: z.object({
    title: z.string(),
    funder: z.string(),
    partner: z.string().optional(),
    amount: z.string().optional(),
    period: z.string().optional(),
    summary: z.string().optional(),
    order: z.number().default(100),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    period: z.string().optional(),
    description: z.string(),
    order: z.number().default(100),
    sample: z.boolean().default(false),
  }),
});

export const collections = {
  people,
  projects,
  research,
  events,
  news,
  openings,
  publications,
  facilities,
  documents,
  partners,
  funding,
  gallery,
};
