import type { APIRoute } from 'astro';
import { site as profile } from '../data/site';
import { isConfigured } from '../utils/links';
export const GET: APIRoute = ({ site }) => {
  const ready = site?.hostname !== 'example.invalid' && isConfigured(profile.email) && isConfigured(profile.githubUsername);
  return new Response(`User-agent: *\n${ready ? 'Allow: /' : 'Disallow: /'}\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
