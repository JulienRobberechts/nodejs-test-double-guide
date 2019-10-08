var moduleBVariable = require("./moduleB");

function DoItA() {
  return "A(" + moduleBVariable.DoItB() + ")";
}

function DoItA2() {
  return "A(" + moduleBVariable.DoItB2() + ")";
}

module.exports = { DoItA, DoItA2 };
