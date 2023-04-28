#!/usr/bin/env zx
import "zx/globals";

let { version } = JSON.parse(await fs.readFile("./package.json"));
console.log("version: ", version);

await $`pnpm install`;
await $`git add -A .`;
try {
  await $`git commit -m version: ${version} test`;
} catch (e) {
  if (!e.stdout.includes("nothing to commit")) {
    throw e;
  }
}

await $`git tag -m "v${version}" v${version}`;
await $`git push --follow-tags`;
