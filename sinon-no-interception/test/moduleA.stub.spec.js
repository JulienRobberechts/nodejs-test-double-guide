"use strict";
const sinon = require("sinon");
const moduleA = require("../lib/moduleA");
const moduleB = require("../lib/moduleB");
var chai = require("chai");
var expect = chai.expect;

describe("module A tests with sinon stub", () => {
  it("This test should call DoItA and return alpha - obvious test just for demo", () => {
    const spy = sinon.stub(moduleA, "DoItA").returns("alpha");
    expect(moduleA.DoItA()).to.be.equal("alpha");
    expect(spy.called).to.be.true;
    sinon.restore();
  });

  it("The implementation of A should call DoItB in module B and stub it to 'beta' - interesting test", () => {
    const spy = sinon.stub(moduleB, "DoItB").returns("beta");
    expect(moduleA.DoItA()).to.be.equal("A(beta)");
    expect(spy.called).to.be.true;
    sinon.restore();
  });
});
