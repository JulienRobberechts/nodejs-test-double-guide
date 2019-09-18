// test/myModule.test.js
var rewire = require("rewire");
var chai = require("chai");
var expect = chai.expect;

// intercept fs.readFile in myModule with rewire
var myModule = rewire("../lib/myModule.js");
var fsMock = {
  readFile: function(path, encoding, cb) {
    expect(path).to.equal("/somewhere/on/the/disk");
    const result = "MOCKED RESULT";
    cb(null, result);
  }
};
myModule.__set__("fs", fsMock);

describe("fs.readFile intercepted by rewire and stub manually", function() {
  it("should return MOCKED RESULT", function() {
    const expected = "MOCKED RESULT";
    myModule.readSomethingFromFileSystem(function(err, data) {
      expect(data).to.be.equal(expected);
    });
  });
});
