"use strict";
const sinon = require("sinon");
const moduleA = require("./code-under-test/moduleA-with-mistake");
const moduleB = require("./code-under-test/moduleB");
var chai = require("chai");
var expect = chai.expect;

describe("module A tests - mistake 2", () => {
  it("The implementation of A should call DoItB in module B - It will not work because method is destructured in the code under test", () => {
    const spy = sinon.spy(moduleB, "DoItB");
    expect(moduleA.DoItA()).to.be.equal("A(B)");

    // The spy is NOT called because the method is destructured in the code under test (moduleA-with-mistake)
    expect(spy.called).to.not.be.true;
    sinon.restore();
  });
});
