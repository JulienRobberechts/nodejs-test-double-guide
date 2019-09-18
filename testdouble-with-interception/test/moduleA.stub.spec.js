var td = require("testdouble");
var chai = require("chai");
var expect = chai.expect;

var moduleA;
var moduleB;

describe("moduleB.DoItB intercepted and stubbed by testdouble", function() {
  beforeEach(function() {
    moduleB = td.replace("../lib/moduleB");
    moduleA = require("../lib/moduleA");
  });
  it("should return A(beta)", function() {
    // Arrange
    td.when(moduleB.DoItB()).thenReturn("beta");

    // Act
    const actual = moduleA.DoItA();

    // Assert 1: dependency moduleB.DoItB has been called
    td.verify(moduleB.DoItB());

    // Assert 2: result
    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    td.reset();
  });
});
