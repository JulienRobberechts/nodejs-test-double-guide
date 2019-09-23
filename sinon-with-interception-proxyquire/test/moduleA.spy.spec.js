"use strict";
var sinon = require("sinon");
var chai = require("chai");
var proxyquire = require("proxyquire").noPreserveCache();
var expect = chai.expect;

describe("moduleB intercepted by proxyquire and spied by Sinon (but with empty behavior)", function() {
  it("should return A(undefined)", function() {
    // Arrange
    let DoItBSpy = sinon.stub();

    // import the module to test, using a fake dependency
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: DoItBSpy
      }
    });

    // Act
    const actual = moduleA.DoItA();

    // Assert 1
    expect(DoItBSpy.called).to.be.true;

    // Assert 2
    // In fact the behavior is modified it's not really a spy,
    // just a mock with, it's just a stub with empty behavior.
    const expected = "A(undefined)";
    expect(actual).to.be.equal(expected);
  });
  it("side effect: No, everything is working", function() {
    // Arrange
    let DoItBSpy = sinon.stub();

    // import the module to test, using a fake dependency
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: DoItBSpy
      }
    });

    // Act
    const actual = moduleA.DoItA2();

    // Assert
    const expected = "A(B2)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    sinon.restore();
  });
});
