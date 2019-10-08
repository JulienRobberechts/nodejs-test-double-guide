"use strict";
const rewire = require("rewire");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

let moduleA, DoItBStub;

describe("Rewire intercepted stubs", function() {
  before(function() {
    // intercept moduleB.DoItB in moduleA with rewire
    moduleA = rewire("../lib/moduleA");
    DoItBStub = sinon.stub();
    var moduleBTestDouble = {
      DoItB: DoItBStub
    };
    moduleA.__set__("moduleBVariable", moduleBTestDouble);
  });
  it("are replacing the behavior of the the target stubbed function", function() {
    DoItBStub.returns("beta");

    const actual = moduleA.DoItA();

    expect(DoItBStub.calledOnce).to.be.true;

    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  it("are not aware of sibling functions anymore", function() {
    DoItBStub.returns("beta");

    const callAnOtherMethod = () => {
      moduleA.DoItA2();
    };

    expect(callAnOtherMethod).to.throw(
      "moduleBVariable.DoItB2 is not a function"
    );
  });
  afterEach(function() {
    sinon.reset();
  });
});
