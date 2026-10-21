import { execFileSync } from "node:child_process";
import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const input = process.argv.slice(2);
if (input.length !== 1) throw new Error("Usage: npm run link-runner -- /path/to/dispatch");
const runner = resolve(input[0], "packages/runner");
const manifest = JSON.parse(await readFile(join(runner, "package.json"), "utf8"));
if (manifest.name !== "@dispatch/runner") throw new Error("Expected a Dispatch repository with packages/runner.");
await access(join(runner, "dist/index.js")).catch(() => {
  throw new Error("Build the runner first: npm run build --workspace @dispatch/runner (from the Dispatch Nix shell).");
});

// Use this npm process's CLI for the same behavior on Windows and POSIX hosts.
const npm = process.env.npm_execpath;
if (!npm) throw new Error("Run this script through npm run link-runner.");
const temporary = await mkdtemp(join(tmpdir(), "scaffold-runner-"));
try {
  const packed = execFileSync(process.execPath, [npm, "pack", runner, "--pack-destination", temporary, "--json"], { encoding: "utf8" });
  const [{ filename }] = JSON.parse(packed);
  execFileSync(process.execPath, [npm, "install", "--no-save", "--package-lock=false", join(temporary, filename)], { cwd: root, stdio: "inherit" });
  console.log("Local runner installed. npm ci restores the pinned public snapshot.");
} finally {
  await rm(temporary, { recursive: true, force: true });
}
