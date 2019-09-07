var proxyquire = require('proxyquire');
var sinon = require('sinon');
var chai = require("chai");
var expect = chai.expect;

const moduleA = require("../lib/moduleA");

var moduleBStub;

// import the module to test, using a fake dependency

describe("stub 1", () => {
  beforeEach(function () {
    moduleBStub = sinon.stub(); // create a stub for every test

    // import the module to test, using a fake dependency
    moduleBStub = proxyquire("../lib/moduleB", {
      DoItB: moduleBStub
    });
  });
  describe('stub 2', function () {
    beforeEach(function () {
      moduleBStub.returns('beta');
    });
    it("works without stub", () => {
      const expected = 'A(beta)';
      const actual = moduleA.DoItA();
      expect(actual).to.be.equal(expected);
      sinon.assert.calledOnce(moduleBStub);
    });
  });
});
