"use strict";
const rewire = require("rewire");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

let moduleA, DoItBStub;

describe("Rewire intercepted spies", function() {
  before(function() {
    // intercept moduleB.DoItB in moduleA with rewire
    moduleA = rewire("../lib/moduleA");
    DoItBStub = sinon.stub();
    var moduleBTestDouble = {
      DoItB: DoItBStub
    };
    moduleA.__set__("moduleB", moduleBTestDouble);
  });
  it("are NOT replacing the behavior of the the target spied function", function() {
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
  it("are not aware of sibling functions anymore", function() {
    const callAnOtherMethod = () => {
      moduleA.DoItA2();
    };

    expect(callAnOtherMethod).to.throw("moduleB.DoItB2 is not a function");
  });
  afterEach(function() {
    sinon.reset();
  });
});
