import prompts from "prompts";
import minimist from "minimist";
import * as banner from "../utils/banner.js";
import {
  getGitRepoBranchList,
  generateUrl,
  downloadTemplate,
} from "../utils/download.js";

async function init() {
  // 打印 logo
  console.log();
  console.log(
    process.stdout.isTTY && process.stdout.getColorDepth() > 8
      ? banner.bannerColored
      : banner.bannerText
  );
  console.log();

  const argv = minimist(process.argv.slice(2), {
    alias: {
      typescript: ["ts"],
      // 'with-tests': ['tests'],
    },
    string: ["_"],
    // all arguments are treated as booleans
    boolean: true,
  });
  // console.log('[debug] argv: ', argv);

  let result;

  // 获取仓库全部 branch
  const branchList = await getGitRepoBranchList();

  const questions = [
    {
      type: "select",
      name: "branch",
      message: "请选择一个分支",
      choices: branchList,
      initial: 1,
    },
    {
      type: "confirm",
      name: "confirm",
      message: "准备好创建新的仓库了吗？",
      initial: true,
    },
  ];

  try {
    result = await prompts(questions, {
      onCancel: () => {
        throw new Error(red("✖") + " Operation cancelled");
      },
    });
    console.log("[debug] result:: ", result);

    const gitUrl = generateUrl("fansOnly", "uni-template", result.branch);
    console.log("[debug] gitUrl: ", gitUrl);
    // 下载
    downloadTemplate(gitUrl, "dist");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

init().catch((err) => {
  console.log(err);
});
