 // you can't destructure this dependency
 var { DoItB, DoItB2 } = require("./moduleB");

function DoItA() {
  return "A(" + DoItB() + ")";
}

function DoItA2() {
  return "A(" + DoItB2() + ")";
}

module.exports = { DoItA, DoItA2 };
