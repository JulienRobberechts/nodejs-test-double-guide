"use strict";
var moduleA = require("../lib/moduleA");
var moduleB = require("../lib/moduleB");

describe("Jasmine partial stub", function() {
  it("Jasmine stub: ok", function() {
    var DoItBStub = spyOn(moduleB, "DoItB").and.returnValue("beta");

    const actual = moduleA.DoItA();

    expect(DoItBStub).toHaveBeenCalled();

    const expected = "A(beta)";
    expect(actual).toBe(expected);
  });
  it("are not modifying the behavior of sibling functions", function() {
    var DoItBStub = spyOn(moduleB, "DoItB").and.returnValue("beta");

    const actual = moduleA.DoItA2();

    const expected = "A(B2)";
    expect(actual).toBe(expected);
  });
});
