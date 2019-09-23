"use strict";
var rewiremock = require("rewiremock/node");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

let moduleA, DoItBStub;

// let DoItBStub = sinon.stub();
// DoItBStub.returns("beta");

// const moduleA = rewiremock.proxy("../lib/moduleA", {
//   "../lib/moduleB": {
//     DoItB: DoItBStub
//   }
// });

describe("moduleB.DoItB intercepted by rewiremock and stub by Sinon", function() {
  before(function() {
    // intercept moduleB.DoItB in moduleA with rewiremock
    DoItBStub = sinon.stub();
    moduleA = rewiremock.proxy("../lib/moduleA", {
      "../lib/moduleB": {
        DoItB: DoItBStub
      }
    });
  });
  it("should return A(beta)", function() {
    // Arrange
    DoItBStub.returns("beta");

    // Act
    const actual = moduleA.DoItA();

    // Assert 1
    expect(DoItBStub.called).to.be.true;

    // Assert 2
    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  it("side effects: the method DoItA2 doesn't exist if you don't stub it.", function() {
    const callAnOtherMethod = () => {
      moduleA.DoItA2();
    };

    expect(callAnOtherMethod).to.throw("moduleB.DoItB2 is not a function");
  });
  afterEach(function() {
    sinon.restore();
  });
});
