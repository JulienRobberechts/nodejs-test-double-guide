"use strict";
const sinon = require("sinon");
const { DoItA, DoItA2 } = require("../lib/moduleA"); // you CAN destructure this dependency
const moduleB = require("../lib/moduleB"); // you CAN'T destructure this dependency
var chai = require("chai");
var expect = chai.expect;

describe("Sinon partial spies", () => {
  it("are NOT changing the behavior of the target spied function", () => {
    const spy = sinon.spy(moduleB, "DoItB");

    const actual = DoItA();

    expect(spy.called).to.be.true;

    const expected = "A(B)";
    expect(actual).to.be.equal(expected);
  });
  it("are not modifying the behavior of sibling functions", () => {
    const spy = sinon.spy(moduleB, "DoItB");

    const actual = DoItA2();

    const expected = "A(B2)";
    expect(actual).to.be.equal(expected);
  });

  afterEach(function() {
    sinon.restore();
  });
});
