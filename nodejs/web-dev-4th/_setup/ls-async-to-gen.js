const fs = require("fs");
const util = require("util");

// const fs_readdir = util.promisify(fs.readdir);
// Polyfill for Node.js 6.x, which doesn't have util.promisify
const fs_readdir = dir => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, fileList) => {
      if (err) reject(err);
      else resolve(fileList);
    });
  });
};

(async () => {
  var dir = ".";
  console.log(process.argv);

  if (process.argv[2]) dir = process.argv[2];

  const files = await fs_readdir(dir);
  // const files = await fs.readdirSync(".");

  for (let fn of files) {
    console.log(fn);
  }
})().catch(err => {
  console.log(err);
});
