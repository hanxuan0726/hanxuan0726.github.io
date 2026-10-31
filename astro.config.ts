import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/data/site';
import { isConfigured } from './src/utils/links';

// A reserved domain keeps a fresh placeholder checkout buildable without inventing an account.
// On GitHub Actions, the owner provides the correct origin even before a custom domain is used.
const username = isConfigured(site.githubUsername) ? site.githubUsername : process.env.GITHUB_REPOSITORY_OWNER;
const origin = process.env.SITE_URL || (username ? `https://${username.toLowerCase()}.github.io` : 'https://example.invalid');
export default defineConfig({
  site: origin,
  base: '/', // Username repository: USERNAME.github.io. Do not add a repository subpath.
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
