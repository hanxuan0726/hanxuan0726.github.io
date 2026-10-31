export function isConfigured(value: string | null | undefined): value is string {
  return Boolean(value && !/\[[^\]]+\]/.test(value));
}
export function safeUrl(value: string | null | undefined): string | undefined {
  if (!isConfigured(value)) return undefined;
  if (/^\/(?!\/)/.test(value) || /^mailto:[^\s]+@[^\s]+$/.test(value)) return value;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : undefined; }
  catch { return undefined; }
}
export function formatDate(value: string | null): string {
  if (!value) return '';
  if (value === 'Present') return value;
  return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}-01T00:00:00Z`));
}
