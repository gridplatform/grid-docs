#!/usr/bin/env node
/**
 * Renders docs/Install/Configuration.md from data/configuration.json.
 * Edit the JSON when env vars change, then run: npm run sync:config
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'data', 'configuration.json');
const outPath = path.join(root, 'docs', 'Install', 'Configuration.md');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

function escapeCell(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ');
}

function renderTable(vars) {
  const lines = [
    '| Variable | Required | Purpose | Typical |',
    '|----------|----------|---------|---------|',
  ];
  for (const v of vars) {
    lines.push(
      `| \`${v.name}\` | ${v.required ? 'yes' : ''} | ${escapeCell(v.purpose)} | ${escapeCell(v.typical)} |`
    );
  }
  return lines.join('\n');
}

const parts = [];

parts.push(`---
title: Configuration
---

# Configuration

Environment variables for **grid-core**, install Compose, and the console.

> **How to update this page**  
> Edit [\`data/configuration.json\`](https://github.com/gridplatform/grid-docs/blob/main/data/configuration.json), then run \`npm run sync:config\`.  
> Do not hand-edit the tables below — CI checks that the generated file matches the JSON.

Canonical templates in product repos:

- Install: [\`grid-core/install/.env.example\`](${data.sources.installEnv})
- Core (local / native): [\`grid-core/.env.example\`](${data.sources.coreEnv})
- Console: [\`grid-ui/.env.example\`](${data.sources.uiEnv})

**Required** = needed for production / install boot (\`npm run prod\`, Compose \`check-env.sh\`).
`);

for (const section of data.sections) {
  parts.push(`## ${section.title}`);
  parts.push('');
  if (section.intro) {
    parts.push(section.intro);
    parts.push('');
  }
  parts.push(renderTable(section.vars));
  parts.push('');
}

parts.push(`## Secrets hygiene

- Never commit \`.env\` or \`install/.env\`.
- Prefer instance roles / OIDC over long-lived keys on the VM when possible.
- Rotate \`GRID_AUTH_ADMIN_PASSWORD\` after first login if the image was shared.
- Keep bootstrap env vars in sync when you rotate the superadmin via CLI.

## Related

- [Remote state](./Remote_State.md)
- [Monitoring](./Monitoring.md)
- [Development vs production](./Dev_Vs_Prod.md)
- [Releases](./Releases.md)
`);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${parts.join('\n').trimEnd()}\n`, 'utf8');
console.log(`Wrote ${path.relative(root, outPath)}`);
