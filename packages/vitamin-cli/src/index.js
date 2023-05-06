import * as path from "node:path";
import prompts from "prompts";
import minimist from "minimist";
import { red } from "kolorist";
import * as banner from "../utils/banner.js";
import {
  getGitRepoBranchList,
  generateUrl,
  downloadTemplate,
} from "../utils/download.js";
import { getPresetTemplates } from "../utils/getPresetTemplates.js";
import { copyTemplate } from "../utils/copyTemplate.js";

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
  console.log("[debug] argv: ", argv);

  // 获取模板列表
  const getTemplateList = async (type = "preset") => {
    if (type === "git") {
      // 获取仓库全部分支模板
      return await getGitRepoBranchList();
    } else {
      // 获取全部预设模板
      return getPresetTemplates();
    }
  };

  let result;
  const cwd = process.cwd();
  const output = path.resolve(cwd, "dist");

  const questions = [
    {
      type: "select",
      name: "source",
      message: "请选择模板地址",
      choices: [
        { title: "Preset", value: "preset", description: "从预设模版下载" },
        { title: "Github", value: "git", description: "从 Github 仓库下载" },
      ],
      initial: 0,
    },
    {
      type: "select",
      name: "template",
      message: "请选择一个模版",
      choices: (prev) => getTemplateList(prev),
      initial: 0,
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

    if (!result.confirm) return;

    if (result.source === "git") {
      // 1. download from github
      const gitUrl = generateUrl("fansOnly", "uni-template", result.template);
      downloadTemplate(gitUrl, output);
    } else if (result.source === "preset") {
      // 2. copy template from preset
      const targetPath = path.resolve(cwd, `../create-demo/${result.template}`);
      copyTemplate(targetPath, output);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

init().catch((err) => {
  console.log(err);
});
