"use strict";
const sinon = require("sinon");
const { DoItA } = require("../lib/moduleA");
var chai = require("chai");
var expect = chai.expect;

describe("module A tests - mistake 1", () => {
  it("This test should call DoItA - It will not work because method is destructured in the test", () => {
    const spy = sinon.spy(DoItA);
    expect(DoItA()).to.be.equal("A(B)");

    // The spy is NOT called because the method is destructured in the test code
    expect(spy.called).to.not.be.true;
    sinon.restore();
  });
});
