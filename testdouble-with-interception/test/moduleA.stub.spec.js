"use strict";
var td = require("testdouble");
var chai = require("chai");
var expect = chai.expect;

// you can't declare the system under test before replacing the dependencies:
// var moduleA = require("../lib/moduleA");

let moduleA, moduleB;

describe("testdouble intercepted stubs", function() {
  beforeEach(function() {
    // intercept moduleB everywhere with testdouble
    moduleB = td.replace("../lib/moduleB");

    // The correct way is to call require after replacing the dependencies:
    moduleA = require("../lib/moduleA");
  });
  it("are replacing the behavior of the the target stubbed function", function() {
    td.when(moduleB.DoItB()).thenReturn("beta");

    const actual = moduleA.DoItA();

    // the testdouble framework will even warn you that checking
    // the call and stub the dependency can be redundant!
    td.verify(moduleB.DoItB());

    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  it("are SURPRISINGLY aware of sibling functions but with an empty behavior", function() {
    td.when(moduleB.DoItB()).thenReturn("beta");

    const actual = moduleA.DoItA2();

    const expected = "A(undefined)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    td.reset();
  });
});
