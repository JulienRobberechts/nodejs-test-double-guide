"use strict";
var rewiremock = require("rewiremock/node");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

let moduleA, DoItBSpy;

describe("rewiremock intercepted spies", function() {
  before(function() {
    // intercept moduleB.DoItB in moduleA with rewiremock
    DoItBSpy = sinon.stub();
    moduleA = rewiremock.proxy("../lib/moduleA", {
      "../lib/moduleB": {
        DoItB: DoItBSpy
      }
    });
  });
  it("are NOT replacing the behavior of the the target spied function", function() {
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
  it("are not aware of sibling functions anymore", function() {
    const callAnOtherMethod = () => {
      moduleA.DoItA2();
    };

    expect(callAnOtherMethod).to.throw("moduleB.DoItB2 is not a function");
  });
  afterEach(function() {
    sinon.restore();
  });
});
