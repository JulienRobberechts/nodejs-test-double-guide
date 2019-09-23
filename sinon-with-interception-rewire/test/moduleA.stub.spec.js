"use strict";
const rewire = require("rewire");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

let moduleA, DoItBStub;

describe("moduleB.DoItB interception by rewire and spied by Sinon", function() {
  before(function() {
    // intercept moduleB.DoItB in moduleA with rewire
    moduleA = rewire("../lib/moduleA");
    DoItBStub = sinon.stub();
    var moduleBTestDouble = {
      DoItB: DoItBStub
    };
    moduleA.__set__("moduleB", moduleBTestDouble);
  });
  it("should return A(beta)", function() {
    // Arrange
    DoItBStub.returns("beta");

    // Act
    const actual = moduleA.DoItA();

    // Assert
    expect(DoItBStub.calledOnce).to.be.true;

    // Assert
    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  it("should return A(beta) BIS", function() {
    // Arrange
    DoItBStub.returns("gamma");

    // Act
    const actual = moduleA.DoItA();

    // Assert
    expect(DoItBStub.calledOnce).to.be.true;

    // Assert
    const expected = "A(gamma)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    sinon.reset();
  });
});
