const moduleA = require("../lib/moduleA");
var chai = require("chai");
var expect = chai.expect;

describe("module A tests (without spy)", () => {
  it("works without spy", () => {
    expect(moduleA.DoItA()).to.be.equal("A(B)");
  });
});
