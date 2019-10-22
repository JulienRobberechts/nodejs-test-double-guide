"use strict";
var sinon = require("sinon");
var chai = require("chai");
var proxyquire = require("proxyquire").noPreserveCache();
var expect = chai.expect;

let moduleA, DoItBSpy;

describe("Proxyquire intercepted spies", function() {
  before(function() {
    DoItBSpy = sinon.stub();
    // intercept moduleB.DoItB in moduleA with proxyquire
    moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: DoItBSpy
      }
    });
  });
  it("are deleting the behavior of the target spied function", function() {
    const actual = moduleA.DoItA();

    expect(DoItBSpy.called).to.be.true;

    const expected = "A(undefined)";
    expect(actual).to.be.equal(expected);
  });
  it("are SURPRISINGLY not modifying the behavior of sibling functions", function() {
    const actual = moduleA.DoItA2();

    const expected = "A(B2)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    sinon.reset();
  });
  after(function() {
    sinon.restore();
  });
});
