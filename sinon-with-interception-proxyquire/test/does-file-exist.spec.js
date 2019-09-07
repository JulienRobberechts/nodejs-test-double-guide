var proxyquire = require('proxyquire').noCallThru().noPreserveCache();
var sinon = require('sinon');
var chai = require("chai");
var expect = chai.expect;

var moduleA;  // module to test
var moduleBStub; // module to stub

describe('doesFileExist', function () {
    beforeEach(function () {
        moduleBStub = sinon.stub(); // create a stub for every test

        // import the module to test, using a fake dependency
        moduleA = proxyquire('../lib/moduleA', {
            './moduleB': {
                DoItB: moduleBStub
            },
        });
    });

    describe('when a path exists', function () {
        beforeEach(function() {
            moduleBStub.returns('beta');
        });

        it('should return A(beta)', function () {
            const expected = 'A(beta)';
            const actual = moduleA.DoItA();
            expect(moduleBStub.called).to.be.true;
            expect(actual).to.be.equal(expected);
        });
    });
});
