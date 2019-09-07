var { DoItB } = require("./moduleB");

function DoItA() {
  return "A(" + DoItB() + ")";
}

module.exports = { DoItA };
