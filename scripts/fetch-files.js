const fs = require("fs");
const path = require("path");

module.exports = function getFiles(directory, fileType) {
  const files = fs.readdirSync(directory);
  let filePaths = [];

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const subdirectoryFiles = getFiles(filePath, fileType);
      filePaths = filePaths.concat(subdirectoryFiles);
    } else if (path.extname(filePath) == fileType) {
      filePaths.push(filePath);
    }
  }

  return filePaths;
};
