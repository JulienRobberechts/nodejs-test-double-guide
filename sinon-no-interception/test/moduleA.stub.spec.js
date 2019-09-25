"use strict";
const sinon = require("sinon");
const { DoItA, DoItA2 } = require("../lib/moduleA"); // you CAN destructure this dependency
const moduleB = require("../lib/moduleB"); // you CAN'T destructure this dependency
var chai = require("chai");
var expect = chai.expect;

describe("Sinon partial stub", () => {
  it("are replacing the behavior of the the target stubbed function", () => {
    // partial stub with sinon
    const spy = sinon.stub(moduleB, "DoItB").returns("beta");

    const actual = DoItA();

    expect(spy.called).to.be.true;

    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  it("are not modifying the behavior of sibling functions", () => {
    const spy = sinon.stub(moduleB, "DoItB").returns("beta");

    const actual = DoItA2();

    const expected = "A(B2)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    sinon.restore();
  });
});
