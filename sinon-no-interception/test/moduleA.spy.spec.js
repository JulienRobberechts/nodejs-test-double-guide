const sinon = require("sinon");
const { DoItA } = require("../lib/moduleA"); // you can destructure this dependency
const moduleB = require("../lib/moduleB"); // you can't destructure this dependency
var chai = require("chai");
var expect = chai.expect;

describe("module A tests with sinon spy", () => {
  it("The implementation of A should call DoItB in module B - interesting test", () => {
    const spy = sinon.spy(moduleB, "DoItB");
    expect(DoItA()).to.be.equal("A(B)");
    expect(spy.called).to.be.true;
    sinon.restore();
  });
});
