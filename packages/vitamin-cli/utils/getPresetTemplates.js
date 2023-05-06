import * as fs from "node:fs";
import * as path from "node:path";

export const getPresetTemplates = () => {
  const root = path.resolve(process.cwd(), "../create-demo");
  const files = fs.readdirSync(root);
  const dirs = files.filter((file) => {
    const stats = fs.statSync(path.resolve(root, file));
    return stats.isDirectory();
  });
  return dirs.map((name) => ({
    title: name,
    value: name,
    description: "",
  }));
};
