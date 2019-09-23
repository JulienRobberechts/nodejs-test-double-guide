var sinon = require("sinon");
var chai = require("chai");
var proxyquire = require("proxyquire").noPreserveCache();
var expect = chai.expect;

describe("moduleB intercepted by proxyquire and stub by Sinon", function() {
  it("should return A(beta)", function() {
    // Arrange
    let moduleBStub = sinon.stub();
    moduleBStub.returns("beta");

    // import the module to test, using a fake dependency
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: moduleBStub
      }
    });

    // Act
    const actual = moduleA.DoItA();

    // Assert 1
    expect(moduleBStub.called).to.be.true;
    
    // Assert 2
    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function () {
    sinon.restore();
  });
});
