var moduleA = require('../lib/moduleA');
var moduleB = require('../lib/moduleB');

describe("module A tests with Jasmine spy", function () {
  beforeEach(function () {
    // console.log('beforeEach');
  });
  it("Jasmine stub: ok", function () {
    var DoItBStub = spyOn(moduleB, 'DoItB').and.returnValue('beta');
    const actual = moduleA.DoItA();
    const expected = 'A(beta)';
    expect(DoItBStub).toHaveBeenCalled();
    expect(actual).toBe(expected);
  });
  it("Jasmine stub don't change the behavior of DoItA2", function () {
    var DoItBStub = spyOn(moduleB, 'DoItB').and.returnValue('beta');
    const actual = moduleA.DoItA2();

    const expected = 'A(B2)';
    expect(actual).toBe(expected);
  });
  afterEach(function () {
    // console.log('afterEach');
  });
});

