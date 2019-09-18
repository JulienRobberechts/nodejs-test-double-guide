var td = require("testdouble");
var chai = require("chai");
var expect = chai.expect;

var moduleA = require("../lib/moduleA");
var moduleB;

// const DoItBStub = td.replace("../lib/moduleB", "DoItB");

// let DoItBStub = sinon.stub();
// DoItBStub.returns("beta");

// const moduleA = rewiremock.proxy("../lib/moduleA", {
//   "../lib/moduleB": {
//     DoItB: DoItBStub
//   }
// });

// var moduleA = require("../lib/moduleA");

describe("moduleB.DoItB intercepted and stub by testdouble", function() {
  beforeEach(function() {
    console.log("beforeEach");
    moduleB = td.replace("../lib/moduleB", {
      DoItB: function() {
        return "beta";
      }
    });
  });
  it("should return A(beta)", function() {
    const actual = moduleA.DoItA();
    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function() {
    console.log("afterEach");
  });
});
