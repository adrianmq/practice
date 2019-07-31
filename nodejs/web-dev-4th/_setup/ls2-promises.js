const fs_promises = require("fs").promises;

(async () => {
  var dir = ".";
  if (process.argv[2]) dir = process.argv[2];
  const files = await fs_promises.readdir(dir);
  for (let fn of files) {
    console.log(fn);
  }
})().catch(err => {
  console.log(err);
});
