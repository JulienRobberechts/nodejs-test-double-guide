"use strict";
var rewiremock = require("rewiremock/node");
var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;

let moduleA, DoItBSpy;

describe("rewiremock intercepted spies", function() {
  before(function() {
    DoItBSpy = sinon.stub();
    moduleA = rewiremock.proxy("../lib/moduleA", {
      "../lib/moduleB": {
        DoItB: DoItBSpy
      }
    });
  });
  it("are NOT replacing the behavior of the the target spied function", function() {
    const actual = moduleA.DoItA();

    expect(DoItBSpy.called).to.be.true;

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
