import colors from "picocolors";
import { run } from "./utils.js";

const packages = ["create-demo", "vitamin-cli"];

const generateChangeLog = async (pkgs) => {
  console.log(colors.cyan("\nGenerating changelog..."));
  const changelogArgs = [
    "conventional-changelog",
    "-p",
    "angular",
    "-i",
    "CHANGELOG.md",
    "-s",
    "--commit-path",
    ".",
  ];
  pkgs.forEach(async (pkg) => {
    await run("npx", changelogArgs, { cwd: `packages/${pkg}` });
  });
};

const release = () => {
  generateChangeLog(packages);
};

release();
