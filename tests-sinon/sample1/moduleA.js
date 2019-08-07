var moduleB = require('./moduleB');

function DoItA() {
  return 'A(' + moduleB.DoItB() + ')';
}

module.exports = { DoItA };