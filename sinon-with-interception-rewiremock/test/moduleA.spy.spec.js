var rewiremock = require("rewiremock/node");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

let DoItBSpy = sinon.stub();

const moduleA = rewiremock.proxy("../lib/moduleA", {
  "../lib/moduleB": {
    DoItB: DoItBSpy
  }
});

describe("moduleB.DoItB intercepted by rewiremock and spied by Sinon (but with empty behavior)", function() {
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
