import { site } from '../src/data/site';
import { isConfigured, safeUrl } from '../src/utils/links';
const errors: string[] = [];
if (!isConfigured(site.githubUsername) || !/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(site.githubUsername)) errors.push('Set site.githubUsername to your real GitHub username.');
if (!isConfigured(site.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email)) errors.push('Set site.email to your real public email address.');
if (process.env.GITHUB_REPOSITORY && isConfigured(site.githubUsername)) {
  const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
  if (owner.toLowerCase() !== site.githubUsername.toLowerCase() || repo.toLowerCase() !== `${owner.toLowerCase()}.github.io`) errors.push('Use the USERNAME/USERNAME.github.io repository for this root-path configuration.');
}
for (const project of site.projects) for (const link of project.links) {
  if (link.url && !safeUrl(link.url)) errors.push(`Invalid URL for ${project.title}: ${link.label}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Public identity configured: ${site.name} / ${site.email}`);
