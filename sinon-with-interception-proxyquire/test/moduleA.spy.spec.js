"use strict";
var sinon = require("sinon");
var chai = require("chai");
var proxyquire = require("proxyquire").noPreserveCache();
var expect = chai.expect;

describe("Proxyquire intercepted spies", function() {
  it("are NOT replacing the behavior of the the target spied function", function() {
    let DoItBSpy = sinon.stub();
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: DoItBSpy
      }
    });

    const actual = moduleA.DoItA();

    expect(DoItBSpy.called).to.be.true;

    const expected = "A(undefined)";
    expect(actual).to.be.equal(expected);
  });
  it("are SURPRISINGLY not modifying the behavior of sibling functions", function() {
    let DoItBSpy = sinon.stub();
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: DoItBSpy
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
