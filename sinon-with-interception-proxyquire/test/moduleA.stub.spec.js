"use strict";
var sinon = require("sinon");
var chai = require("chai");
var proxyquire = require("proxyquire").noPreserveCache();
var expect = chai.expect;

describe("Proxyquire intercepted stubs", function() {
  it("are replacing the behavior of the the target stubbed function", function() {
    // Arrange
    let moduleBStub = sinon.stub();
    moduleBStub.returns("beta");

    // import the module to test, using a fake dependency
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: moduleBStub
      }
    });

    // Act
    const actual = moduleA.DoItA();

    // Assert 1
    expect(moduleBStub.called).to.be.true;

    // Assert 2
    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  it("are SURPRISINGLY not modifying the behavior of sibling functions", function() {
    // Arrange
    let moduleBStub = sinon.stub();
    moduleBStub.returns("beta");

    // import the module to test, using a fake dependency
    const moduleA = proxyquire("../lib/moduleA", {
      "./moduleB": {
        DoItB: moduleBStub
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
