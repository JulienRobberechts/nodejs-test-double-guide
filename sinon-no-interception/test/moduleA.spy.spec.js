"use strict";
const sinon = require("sinon");
const { DoItA, DoItA2 } = require("../lib/moduleA"); // you CAN destructure this dependency
const moduleB = require("../lib/moduleB"); // you CAN'T destructure this dependency
var chai = require("chai");
var expect = chai.expect;

describe("Sinon spy", () => {
  it("The implementation of A should call DoItB in module B - interesting test", () => {
    const spy = sinon.spy(moduleB, "DoItB");

    const actual = DoItA();

    expect(spy.called).to.be.true;

    const expected = "A(B)";
    expect(actual).to.be.equal(expected);
  });
  it("side effects : no side effects on other methods", () => {
    const spy = sinon.spy(moduleB, "DoItB");

    const actual = DoItA2();

    const expected = "A(B2)";
    expect(actual).to.be.equal(expected);
  });

  afterEach(function() {
    sinon.restore();
  });
});
