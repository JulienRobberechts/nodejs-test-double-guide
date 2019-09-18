var sinon = require("sinon");
var chai = require("chai");
var proxyquire = require("proxyquire").noPreserveCache();
var expect = chai.expect;

describe("moduleB intercepted by proxyquire and spied by Sinon (but with empty behavior)", function() {
  it("should return A(B)", function() {
    let moduleBStub = sinon.stub();

    // import the module to test, using a fake dependency
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: moduleBStub
      }
    });

    const expected = "A(undefined)";
    const actual = moduleA.DoItA();

    expect(moduleBStub.called).to.be.true;

    // In fact the behavior is modified it's not really a spy,
    // just a mock with, it's just a stub with empty behavior.
    expect(actual).to.be.equal(expected);
  });
});
