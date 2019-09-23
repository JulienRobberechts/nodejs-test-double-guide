var moduleB = require("./moduleB"); // you can't destructure this dependency

function DoItA() {
  return "A(" + moduleB.DoItB() + ")";
}

function DoItA2() {
  return "A(" + moduleB.DoItB2() + ")";
}

module.exports = { DoItA, DoItA2 };
