const { readdirSync, statSync, readFileSync, writeFileSync } = require("fs");
const { join, extname } = require("path");

const SOURCE_DIR = "./src";
const DIST_DIR = "./dist";

const copyFiles = (directory) => {
  readdirSync(directory).forEach((file) => {
    const sourceDir = `./${join(directory, file)}`;

    if (statSync(sourceDir).isDirectory()) {
      return copyFiles(sourceDir);
    } else {
      if (extname(sourceDir) == ".graphql") {
        const distDir = sourceDir.replace(SOURCE_DIR, DIST_DIR);
        writeFileSync(distDir, readFileSync(sourceDir, "utf-8"));
      }
    }
  });
};

copyFiles(SOURCE_DIR);
