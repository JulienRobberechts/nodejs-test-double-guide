"use strict";
const sinon = require("sinon");
const moduleA = require("../lib/moduleA-with-mistake");
const moduleB = require("../lib/moduleB");
var chai = require("chai");
var expect = chai.expect;

describe("Sinon spies with destructuring in the component under test", () => {
  it("are not called at all", () => {
    const spy = sinon.spy(moduleB, "DoItB");

    const actual = moduleA.DoItA();

    // The spy is NOT called because the method is destructured in the code under test (moduleA-with-mistake)
    expect(spy.called).to.not.be.true;

    const expected = "A(B)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    sinon.reset();
  });
});
