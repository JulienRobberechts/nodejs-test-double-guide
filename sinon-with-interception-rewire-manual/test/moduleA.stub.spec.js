var rewire = require("rewire");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

// intercept moduleB.DoItB in myModule with rewire
var moduleA = rewire("../lib/moduleA");
var moduleBMock = {
  DoItB: function() {
    return "beta";
  }
};
moduleA.__set__("moduleB", moduleBMock);

describe("moduleB intercepted by rewire and stub by Sinon", function() {
  it("should return A(beta)", function() {
    const actual = moduleA.DoItA();
    const expected = "A(beta)";

    expect(actual).to.be.equal(expected);
  });
});
