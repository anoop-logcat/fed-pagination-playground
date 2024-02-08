const baseConfig = require("../../esbuild.base");
const getFiles = require("../../scripts/fetch-files");

require("esbuild")
  .build(
    Object.assign({}, baseConfig, {
      entryPoints: getFiles("./src", ".ts"),
      outdir: "dist",
    })
  )
  .catch(() => process.exit(1));
