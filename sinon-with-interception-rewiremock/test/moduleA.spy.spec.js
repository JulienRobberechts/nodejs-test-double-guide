"use strict";
var rewiremock = require("rewiremock/node");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

let moduleA, DoItBSpy;

describe("moduleB.DoItB intercepted by rewiremock and spied by Sinon (but with empty behavior)", function() {
  before(function() {
    // intercept moduleB.DoItB in moduleA with rewiremock
    DoItBSpy = sinon.stub();
    moduleA = rewiremock.proxy("../lib/moduleA", {
      "../lib/moduleB": {
        DoItB: DoItBSpy
      }
    });
  });
  it("should return A(undefined)", function() {
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
