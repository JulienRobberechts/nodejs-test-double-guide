"use strict";
const sinon = require("sinon");
const moduleA = require("../lib/moduleA");
const moduleB = require("../lib/moduleB");
var chai = require("chai");
var expect = chai.expect;

describe("module A tests with sinon spy", () => {
  it("This test should call DoItA - obvious test just for demo", () => {
    const spy = sinon.spy(moduleA, "DoItA");
    expect(moduleA.DoItA()).to.be.equal("A(B)");
    expect(spy.called).to.be.true;
    sinon.restore();
  });

  it("The implementation of A should call DoItB in module B - interesting test", () => {
    const spy = sinon.spy(moduleB, "DoItB");
    expect(moduleA.DoItA()).to.be.equal("A(B)");
    expect(spy.called).to.be.true;
    sinon.restore();
  });
});
