var moduleA = require('../lib/moduleA');
var moduleB = require('../lib/moduleB');

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

