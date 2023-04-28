import ora from "ora";
import download from "download";
import { request } from "@octokit/request";
import chalk from "chalk";

// baseUrl: https://api.github.com
// headers.accept: application/vnd.github.v3+json
// headers.agent: octokit-request.js/<current version> <OS information>, e.g. octokit-request.js/1.2.3 Node.js/10.15.0 (macOS Mojave; x64)
export const getGitRepoBranchList = async () => {
  let res = [];
  try {
    // /repos/{owner}/{repo}/branches
    const result = await request("GET /repos/fansOnly/uni-template/branches", {
      headers: {
        authorization:
          "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",
      },
      org: "octokit",
      type: "private",
    });
    // console.log('[debug] result: ', result);
    res = result.data;
  } catch (error) {
    console.error("get git repo branches fail", error);
  }
  return transformBranchList(res);
};

const transformBranchList = (arr) => {
  if (!arr.length) return [];
  return arr.map((branch) => ({
    title: branch.name,
    value: branch.name,
    description: "",
    disabled: branch.protected,
  }));
};

export const generateUrl = (username, repository, branch) => {
  // http://github.com/{user}/{repository}/archive/{master}.zip
  return `https://github.com/${username}/${repository}/archive/${branch}.zip`;
};

export const downloadTemplate = async (url, path) => {
  console.log();
  const spinner = ora("Start download project...").start();
  setTimeout(() => {
    spinner.text = `${chalk.cyan(
      "Your internet speed is a little slow, please wait for a while."
    )}`;
  }, 5000);
  await download(url, path, {
    extract: true, // 解压缩 - decompress
    // filename: ''
  })
    .on("end", () => {
      spinner.succeed("success.");
      console.log();
    })
    .then((stream) => {
      // console.log('[debug] stream: ', stream);
      // return compressing.zip.uncompress(stream, './');
    })
    .catch((err) => {
      console.error(err);
    });
};
