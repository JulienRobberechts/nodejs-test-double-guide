"use strict";
var sinon = require("sinon");
var chai = require("chai");
var proxyquire = require("proxyquire").noPreserveCache();
var expect = chai.expect;

describe("Proxyquire intercepted stubs", function() {
  it("are replacing the behavior of the the target stubbed function", function() {
    let moduleBStub = sinon.stub();
    moduleBStub.returns("beta");

    // intercept moduleB.DoItB in moduleA with proxyquire
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: moduleBStub
      }
    });

    const actual = moduleA.DoItA();

    expect(moduleBStub.called).to.be.true;

    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  it("are SURPRISINGLY not modifying the behavior of sibling functions", function() {
    let moduleBStub = sinon.stub();
    moduleBStub.returns("beta");

    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: moduleBStub
      }
    });

    const actual = moduleA.DoItA2();

    const expected = "A(B2)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    sinon.restore();
  });
});
