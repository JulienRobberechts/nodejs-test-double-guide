var sinon = require("sinon");
var chai = require("chai");
var proxyquire = require("proxyquire").noPreserveCache();
var expect = chai.expect;

describe("moduleB intercepted by proxyquire and stub by Sinon", function() {
  it("should return A(beta)", function() {
    let moduleBStub = sinon.stub();
    moduleBStub.returns("beta");

    // import the module to test, using a fake dependency
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: moduleBStub
      }
    });

    const expected = "A(beta)";
    const actual = moduleA.DoItA();
    expect(moduleBStub.called).to.be.true;
    expect(actual).to.be.equal(expected);
  });
});
