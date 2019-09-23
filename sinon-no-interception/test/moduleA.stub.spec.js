const sinon = require("sinon");
const { DoItA } = require("../lib/moduleA"); // you CAN destructure this dependency
const moduleB = require("../lib/moduleB"); // you CAN'T destructure this dependency
var chai = require("chai");
var expect = chai.expect;

describe("Sinon stub", () => {
  it("The implementation of A should call DoItB in module B and stub it to 'beta' - interesting test", () => {
    const spy = sinon.stub(moduleB, "DoItB").returns("beta");

    const actual = DoItA();
    
    expect(spy.called).to.be.true;

    const expected = "A(beta)";
    expect(actual).to.be.equal(expected);
  });
  afterEach(function () {
    sinon.restore();
  });
});
