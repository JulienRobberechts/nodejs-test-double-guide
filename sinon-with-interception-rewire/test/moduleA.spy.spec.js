"use strict";
const rewire = require("rewire");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

let moduleA, DoItBStub;

describe("moduleB.DoItB interception by rewire and stubbed by Sinon", function() {
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
    // nothing for a spy

    // Act
    const actual = moduleA.DoItA();

    // Assert
    expect(DoItBStub.calledOnce).to.be.true;

    // Assert
    const expected = "A(undefined)";
    expect(actual).to.be.equal(expected);
  });
  it("should return A(beta) BIS", function() {
    // Arrange
    // nothing for a spy

    // Act
    const actual = moduleA.DoItA();

    // Assert
    expect(DoItBStub.calledOnce).to.be.true;

    // Assert
    const expected = "A(undefined)";
    expect(actual).to.be.equal(expected);
  });
  it("side effects: the method DoItA2 doesn't exist if you don't stub it.", function() {
    const callAnOtherMethod = () => {
      moduleA.DoItA2();
    };

    expect(callAnOtherMethod).to.throw("moduleB.DoItB2 is not a function");
  });
  afterEach(function() {
    sinon.reset();
  });
});
