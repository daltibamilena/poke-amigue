const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const dbPath = path.join(__dirname, '..', 'apps', 'api', 'prisma', 'dev.db');

fs.mkdirSync(path.dirname(dbPath), { recursive: true });
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
  console.log(`Created empty database file: ${dbPath}`);
} else {
  console.log(`Database file already exists: ${dbPath}`);
}

const commands = [
  ['npm', ['run', 'prisma:generate', '--workspace', 'apps/api']],
  ['npm', ['run', 'prisma:migrate', '--workspace', 'apps/api', '--', '--name', 'init']],
];

for (const [command, args] of commands) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
    cwd: path.join(__dirname, '..'),
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
