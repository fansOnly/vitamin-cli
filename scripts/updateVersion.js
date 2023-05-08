import * as fs from "node:fs";
import * as path from "node:path";
// import minimist from "minimist";

// const argv = minimist(process.argv.slice(2));
// console.log('argv: ', argv);

const cwd = process.cwd();

const genNewVersion = (version) => {
  return version
    .split(".")
    .map((v, i, arr) => (i === arr.length - 1 ? +v + 1 : v))
    .join(".");
};

export const updateVersion = () => {
  // let newVersion = argv.version;

  const pkgJsonPath = path.resolve(cwd, "packages/vitamin-cli/package.json");
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath));
  const oldVersion = pkgJson.version;
  pkgJson.version = genNewVersion(oldVersion);

  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
};

updateVersion();
