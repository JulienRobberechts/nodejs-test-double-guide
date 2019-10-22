"use strict";
var rewiremock = require("rewiremock/node");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

let moduleA, DoItBStub;

describe("rewiremock intercepted stubs", function() {
  before(function() {
    DoItBStub = sinon.stub();
    // intercept moduleB.DoItB in moduleA with rewiremock
    moduleA = rewiremock.proxy("../lib/moduleA", {
      "../lib/moduleB": {
        DoItB: DoItBStub
      }
    });
  });
  it("are replacing the behavior of the the target stubbed function", function() {
    DoItBStub.returns("beta");

    const actual = moduleA.DoItA();

    expect(DoItBStub.called).to.be.true;

    const expected = "A(beta)";
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
  after(function() {
    sinon.restore();
  });
});
