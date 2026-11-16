// Writes a CycloneDX SBOM of the runtime dependencies to stdout.
//
// `npm sbom --omit dev` drops every package a devDependency also uses (here
// most of eslint's tree, since eslint is both a peer and a devDependency), so
// this takes npm's full SBOM and keeps what `npm ls --omit=dev` says ships.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import process from 'node:process';

const npm = (...args) =>
  JSON.parse(
    execFileSync('npm', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  );
const sbom = npm('sbom', '--sbom-format', 'cyclonedx');
const runtime = new Set();
const walk = (dependencies = {}) => {
  for (const [name, dependency] of Object.entries(dependencies)) {
    // Optional dependencies and peers that aren't installed have no version
    if (!dependency.version) continue;

    runtime.add(`${name}@${dependency.version}`);
    walk(dependency.dependencies);
  }
};

walk(npm('ls', '--omit=dev', '--all', '--json').dependencies);

const root = sbom.metadata.component;
const kept = new Set([root['bom-ref'], ...runtime]);

sbom.components = sbom.components.filter((c) => kept.has(c['bom-ref']));
sbom.dependencies = sbom.dependencies
  .filter((d) => kept.has(d.ref))
  .map((d) => ({ ...d, dependsOn: d.dependsOn.filter((r) => kept.has(r)) }));
// npm names the root after the checkout folder, not the package
root.name = JSON.parse(readFileSync('package.json', 'utf8')).name;

const listed = new Set(sbom.components.map((c) => c['bom-ref']));
const missing = [...runtime].filter((ref) => !listed.has(ref));

if (missing.length > 0) {
  process.stderr.write(`Not in npm's SBOM: ${missing.join(', ')}\n`);
  process.exit(1);
}

process.stdout.write(`${JSON.stringify(sbom, null, 2)}\n`);
