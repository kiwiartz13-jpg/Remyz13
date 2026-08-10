// Publishes dist/ to the gh-pages branch without passing file lists on the
// command line (the gh-pages npm package does, which breaks on Windows'
// ~32k-char limit once the site has enough files).
import { execSync } from 'node:child_process';
import { rmSync, existsSync } from 'node:fs';

if (!existsSync('dist')) {
  console.error('dist/ not found — run the build first (npm run deploy runs it via predeploy).');
  process.exit(1);
}

const remote = execSync('git remote get-url origin').toString().trim();
const run = (cmd) => execSync(cmd, { cwd: 'dist', stdio: 'inherit' });

rmSync('dist/.git', { recursive: true, force: true });
try {
  run('git init -b gh-pages');
  run('git add -A');
  run('git commit -m "Deploy"');
  run(`git push -f "${remote}" gh-pages:gh-pages`);
  console.log('Deployed dist/ to gh-pages.');
} finally {
  rmSync('dist/.git', { recursive: true, force: true });
}
