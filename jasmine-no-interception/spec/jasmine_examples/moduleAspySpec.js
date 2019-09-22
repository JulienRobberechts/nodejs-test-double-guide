var moduleA = require('../../lib/jasmine_examples/moduleA');
var moduleB = require('../../lib/jasmine_examples/moduleB');

describe("module A tests with Jasmine spy", function () {
  beforeEach(function () {
    console.log('beforeEach');
  });
  it("Jasmine spy delete the behavior of the function: impossible to use it as a spy?", function () {
    var DoItBSpy = spyOn(moduleB, 'DoItB');
    const actual = moduleA.DoItA();
    const expected = 'A(undefined)';
    expect(true).toBe(true);
    expect(DoItBSpy).toHaveBeenCalled();
    expect(actual).toBe(expected);
  });
  afterEach(function () {
    console.log('afterEach');
  });
});

