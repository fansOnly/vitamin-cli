import * as esbuild from "esbuild";

async function bundleConfigFile(fileName, isESM = true) {
  try {
    const result = await esbuild.build({
      absWorkingDir: process.cwd(),
      bundle: true,
      entryPoints: [fileName],
      outfile: "./dist/out.cjs",
      format: isESM ? "esm" : "cjs",
      platform: "node",
      target: "node16",
      external: ["electron"],
      sourcemap: "inline",
      plugins: [],
    });
    // 获取输出的 code 内容
    // const { text } = result.outputFiles[0]
    // console.log('text: ', text);
  } catch (error) {
    console.error("[debug] build bundle fail on error ", error);
  }
}
bundleConfigFile("./src/index.js", false);
