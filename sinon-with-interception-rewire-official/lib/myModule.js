// With rewire you can change all these variables
var fs = require("fs"),
  path = "/somewhere/on/the/disk";

function readSomethingFromFileSystem(cb) {
  console.log("Reading from file system ...");
  fs.readFile(path, "utf8", cb);
}

exports.readSomethingFromFileSystem = readSomethingFromFileSystem;
