import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const html = await readFile('dist/index.html', 'utf8');
assert(html.includes('Hanxuan Zhou'), 'Full public name must be in generated HTML.');
assert(/id="contact"/.test(html), 'Contact section must be prerendered.');
const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
assert.equal(heading, 'Hanxuan Zhou', 'Identity must be visible HTML text in the main heading.');
const resources = [...html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)].map(match => match[1]);
for (const resource of new Set(resources)) {
  assert(!resource.startsWith('//'), `Unexpected protocol-relative resource: ${resource}`);
  const file = resource.endsWith('/') ? `${resource}index.html` : resource;
  await access(join('dist', file));
}
for (const file of ['404.html', 'sitemap-index.xml', 'sitemap-0.xml', 'robots.txt', 'favicon.svg', '.nojekyll']) await access(join('dist', file));
const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
assert(!sitemap.includes('/404/'), '404 must not appear in sitemap.');
console.log(`Static HTML and ${new Set(resources).size} root-relative resources verified.`);
