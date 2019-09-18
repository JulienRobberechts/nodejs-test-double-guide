var rewiremock = require("rewiremock/node");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

let DoItBStub = sinon.stub();
DoItBStub.returns("beta");

const moduleA = rewiremock.proxy("../lib/moduleA", {
  "../lib/moduleB": {
    DoItB: DoItBStub
  }
});

describe("moduleB.DoItB intercepted by rewiremock and stub by Sinon", function() {
  it("should return A(beta)", function() {
    const actual = moduleA.DoItA();
    const expected = "A(beta)";
    expect(DoItBStub.called).to.be.true;
    expect(actual).to.be.equal(expected);
  });
});
