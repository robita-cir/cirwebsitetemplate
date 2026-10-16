// Date helpers. Dates are calendar days (no time), so they are formatted in UTC to stay stable
// across build machines and browsers.

const fmt = (date: Date, options: Intl.DateTimeFormatOptions) =>
  date.toLocaleDateString('en-GB', { timeZone: 'UTC', ...options });

/** ISO calendar date (YYYY-MM-DD), for <time datetime> and the NewsItem component. */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** "23 January 2026" */
export const longDate = (date: Date) => fmt(date, { day: 'numeric', month: 'long', year: 'numeric' });

/** "23 Jan 2026" */
export const shortDate = (date: Date) => fmt(date, { day: 'numeric', month: 'short', year: 'numeric' });

/** "23 – 25 Jan 2026", or "23 January 2026" for a single day. */
export const dateRange = (start: Date, end?: Date) => {
  if (!end || isoDate(end) === isoDate(start)) return longDate(start);
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  const startPart = sameYear
    ? fmt(start, { day: 'numeric', month: 'short' })
    : shortDate(start);
  return `${startPart} – ${shortDate(end)}`;
};

export const yearOf = (date: Date) => String(date.getUTCFullYear());

/** Sort helper for entries that carry an `order` field. */
export const byOrder = (a: { data: { order: number } }, b: { data: { order: number } }) =>
  a.data.order - b.data.order;

export const kindLabel: Record<'workshop' | 'programme' | 'talk', string> = {
  workshop: 'Workshop',
  programme: 'Programme',
  talk: 'Talk',
};

export const newsKindLabel: Record<'news' | 'announcement' | 'insight', string> = {
  news: 'News',
  announcement: 'Announcement',
  insight: 'Insight',
};
