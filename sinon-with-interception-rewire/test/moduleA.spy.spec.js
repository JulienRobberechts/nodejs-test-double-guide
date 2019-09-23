var rewire = require("rewire");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

// intercept moduleB.DoItB in myModule with rewire
var moduleA = rewire("../lib/moduleA");
let DoItBSpy = sinon.stub();
// DoItBStub.returns("beta");

var moduleBMock = {
  DoItB: DoItBSpy
};

moduleA.__set__("moduleB", moduleBMock);

describe("moduleB.DoItB intercepted by rewire and and spied by Sinon (but with empty behavior)", function() {
  it("should return A(undefined)", function() {
    const actual = moduleA.DoItA();
    const expected = "A(undefined)";

    expect(DoItBSpy.called).to.be.true;

    // In fact the behavior is modified it's not really a spy,
    // just a mock with, it's just a stub with empty behavior.
    expect(actual).to.be.equal(expected);
  });
  afterEach(function () {
    sinon.restore();
  });
});
