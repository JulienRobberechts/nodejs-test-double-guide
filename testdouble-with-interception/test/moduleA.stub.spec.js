"use strict";
var td = require("testdouble");
var chai = require("chai");
var expect = chai.expect;

// you can't declare the system under test before replacing the dependencies:
// var moduleA = require("../lib/moduleA");

var moduleA;
var moduleB;

describe("moduleB.DoItB intercepted and stubbed by testdouble", function() {
  beforeEach(function() {
    moduleB = td.replace("../lib/moduleB");

    // The correct way is to call require after replacing the dependencies:
    moduleA = require("../lib/moduleA");
  });
  it("should return A(beta)", function() {
    // Arrange
    td.when(moduleB.DoItB()).thenReturn("beta");

    // Act
    const actual = moduleA.DoItA();

    // Assert 1: dependency moduleB.DoItB has been called
    // the testdouble framework will even warn you that check the call and stub the dependency can be redundant!
    td.verify(moduleB.DoItB());

    // Assert 2: result
    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    td.reset();
  });
});
