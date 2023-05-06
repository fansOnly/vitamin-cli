import * as fs from "node:fs";
import * as path from "node:path";
import { deepMerge } from "./deepMerge.js";
import { sortDependencies } from "./sortDependencies.js";

/**
 * 复制模版文件
 * @param {*} src 源文件
 * @param {*} target 目标文件夹
 */
export const copyTemplate = (src, target) => {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (path.basename(src) === "node_modules") return;

    // 递归创建文件夹
    fs.mkdirSync(target, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyTemplate(path.resolve(src, file), path.resolve(target, file));
    }
    return;
  }

  const filename = path.basename(src);

  if (filename === "package.json" && fs.existsSync(target)) {
    // merge package.json
    const oldPkg = JSON.parse(fs.readFileSync(target, "utf-8"));
    const newPkg = JSON.parse(fs.readFileSync(src, "utf-8"));
    const pkg = sortDependencies(deepMerge(oldPkg, newPkg));
    fs.writeFileSync(target, JSON.stringify(pkg, null, 2), "utf-8");
    return;
  }

  if (filename.startsWith("_")) {
    // rename _file to .file
    target = path.resolve(path.dirname(src), filename.replace(/^_/, "."));
  }

  if (filename === "_gitignore" && fs.existsSync(target)) {
    // merge .gitignore
    const oldIgnore = fs.readFileSync(target, "utf-8");
    const newIgnore = fs.readFileSync(src, "utf-8");
    fs.writeFileSync(target, oldIgnore + "\n" + newIgnore, "utf-8");
    return;
  }

  fs.copyFileSync(src, target);
};
