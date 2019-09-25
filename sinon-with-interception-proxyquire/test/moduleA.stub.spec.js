"use strict";
var sinon = require("sinon");
var chai = require("chai");
var proxyquire = require("proxyquire").noPreserveCache();
var expect = chai.expect;

let moduleA, DoItBStub;

describe("Proxyquire intercepted stubs", function() {
  before(function() {
    DoItBStub = sinon.stub();
    // intercept moduleB.DoItB in moduleA with proxyquire
    moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: DoItBStub
      }
    });
  });
  it("are replacing the behavior of the the target stubbed function", function() {
    DoItBStub.returns("beta");

    const actual = moduleA.DoItA();

    expect(DoItBStub.called).to.be.true;

    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  it("are SURPRISINGLY not modifying the behavior of sibling functions", function() {
    DoItBStub.returns("beta");

    const actual = moduleA.DoItA2();

    const expected = "A(B2)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    sinon.restore();
  });
});
