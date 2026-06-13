import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const username = process.env.GITHUB_USERNAME || 'fozayelibnayaz';
const root = process.cwd();
const outputPath = path.join(root, 'data', 'github-snapshot.json');

async function request(url) {
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'fozayel-portfolio-refresh',
      ...(process.env.GITHUB_TOKEN ? { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` } : {})
    }
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }

  return response.json();
}

function pickProfile(profile) {
  const keys = ['login', 'name', 'avatar_url', 'html_url', 'blog', 'location', 'bio', 'public_repos', 'followers', 'created_at', 'updated_at'];
  return Object.fromEntries(keys.map((key) => [key, profile[key] ?? null]));
}

function pickRepo(repo) {
  const keys = ['name', 'full_name', 'html_url', 'description', 'language', 'stargazers_count', 'forks_count', 'updated_at', 'created_at', 'topics', 'homepage', 'fork', 'archived'];
  return Object.fromEntries(keys.map((key) => [key, repo[key] ?? null]));
}

async function main() {
  const [profile, repos] = await Promise.all([
    request(`https://api.github.com/users/${username}`),
    request(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
  ]);

  const cleanRepos = [];
  for (const repo of repos.filter((item) => !item.fork && !item.archived)) {
    const clean = pickRepo(repo);
    try {
      clean.languages_detail = await request(repo.languages_url);
    } catch {
      clean.languages_detail = repo.language ? { [repo.language]: 1 } : {};
    }
    cleanRepos.push(clean);
  }

  const payload = {
    generated_at: new Date().toISOString(),
    profile: pickProfile(profile),
    repos: cleanRepos
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Updated ${outputPath} with ${cleanRepos.length} repositories.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
