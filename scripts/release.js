import colors from "picocolors";
import { run } from "./utils.js";
import { updateVersion } from "./updateVersion.js";

const packages = ["create-demo", "vitamin-cli"];

const generateChangeLog = async (pkgs) => {
  console.log(colors.cyan("Generating changelog..."));
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
  // 更新版本号
  updateVersion();
  // 生成更新日志
  generateChangeLog(packages);
};

release();
