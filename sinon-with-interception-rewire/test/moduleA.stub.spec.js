var rewire = require("rewire");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

// intercept moduleB.DoItB in myModule with rewire
var moduleA = rewire("../lib/moduleA");
let DoItBStub = sinon.stub();
DoItBStub.returns("beta");

var moduleBMock = {
  DoItB: DoItBStub
};

moduleA.__set__("moduleB", moduleBMock);

describe("moduleB.DoItB intercepted by rewire and stub by Sinon", function() {
  it("should return A(beta)", function() {
    const actual = moduleA.DoItA();
    const expected = "A(beta)";
    expect(DoItBStub.called).to.be.true;
    expect(actual).to.be.equal(expected);
  });
  afterEach(function () {
    sinon.restore();
  });
});
