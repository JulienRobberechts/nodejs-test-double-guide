var moduleA = require('../../lib/jasmine_examples/moduleA');
var moduleB = require('../../lib/jasmine_examples/moduleB');

describe("module A tests with Jasmine spy", function () {
  beforeEach(function () {
    console.log('beforeEach');
  });
  it("Jasmine stub: ok", function () {
    var DoItBStub = spyOn(moduleB, 'DoItB').and.returnValue('beta');
    const actual = moduleA.DoItA();
    const expected = 'A(beta)';
    expect(true).toBe(true);
    expect(DoItBStub).toHaveBeenCalled();
    expect(actual).toBe(expected);
  });
  afterEach(function () {
    console.log('afterEach');
  });
});

