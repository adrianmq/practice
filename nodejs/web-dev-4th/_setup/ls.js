const fs = require("fs");
const util = require("util");

const fs_readdir = util.promisify(fs.readdir);

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
