import { execa } from "execa";

export const run = async (bin, args, opt) => {
  return await execa(bin, args, { stdio: "inherit", ...opt });
};
