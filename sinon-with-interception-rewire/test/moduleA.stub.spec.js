var rewire = require("rewire");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

var moduleA = require("../lib/moduleA"); // module to test
var moduleB = rewire("../lib/moduleB"); // module to stub
var DoItBStub;

describe("moduleB intercepted by proxyquire and stub by Sinon", function() {
  beforeEach(function() {
    DoItBStub = sinon.stub(); // create a stub for every test
    DoItBStub.returns("beta");

    // import the module to test, using a fake dependency
    moduleB.__set__({
      DoItB: DoItBStub
    });
  });
  it("should return A(beta)", function() {
    const expected = "A(beta)";
    const actual = moduleA.DoItA();
    expect(DoItBStub.called).to.be.true;
    expect(actual).to.be.equal(expected);
  });
});
