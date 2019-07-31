"use strict";

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

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

_asyncToGenerator(function*() {
  var dir = ".";
  console.log(process.argv);

  if (process.argv[2]) dir = process.argv[2];

  const files = yield fs_readdir(dir);
  // const files = await fs.readdirSync(".");

  for (let fn of files) {
    console.log(fn);
  }
})().catch(err => {
  console.log(err);
});
