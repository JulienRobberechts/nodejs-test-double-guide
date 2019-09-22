var moduleA = require('../lib/moduleA');
var moduleB = require('../lib/moduleB');

describe("module A tests with Jasmine spy", function () {
  beforeEach(function () {
    // console.log('beforeEach');
  });
  it("Jasmine spy delete the behavior of the function", function () {
    var DoItBSpy = spyOn(moduleB, 'DoItB');
    
    const actual = moduleA.DoItA();

    expect(DoItBSpy).toHaveBeenCalled();
    
    const expected = 'A(undefined)';
    expect(actual).toBe(expected);
  });
  it("the spy of DoItB don't affect DoItA2", function () {
    var DoItBSpy = spyOn(moduleB, 'DoItB');
    
    const actual = moduleA.DoItA2();

    const expected = 'A(B2)';
    expect(actual).toBe(expected);
  });
  afterEach(function () {
    // console.log('afterEach');
  });
});

