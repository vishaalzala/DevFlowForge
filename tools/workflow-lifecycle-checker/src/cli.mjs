import { readFileSync } from 'node:fs';
import { validateReport } from './core.mjs';
const args = process.argv.slice(2);
const index = args.indexOf('--input');
if (index === -1 || !args[index + 1]) {
  console.error('Usage: node src/cli.mjs --input <report.json>');
  process.exit(2);
}
try {
  const report = JSON.parse(readFileSync(args[index + 1], 'utf8'));
  const result = validateReport(report);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exitCode = result.ok ? 0 : 1;
} catch (error) {
  console.error(`Invalid report: ${error.message}`);
  process.exitCode = 2;
}
