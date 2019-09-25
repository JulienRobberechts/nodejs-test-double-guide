"use strict";
var moduleA = require("../lib/moduleA");
var moduleB = require("../lib/moduleB");

describe("Jasmine partial spies", function() {
  it("are deleting the behavior of the target spied function", function() {
    var DoItBSpy = spyOn(moduleB, "DoItB");

    const actual = moduleA.DoItA();

    expect(DoItBSpy).toHaveBeenCalled();

    const expected = "A(undefined)";
    expect(actual).toBe(expected);
  });
  it("are not modifying the behavior of sibling functions", function() {
    var DoItBSpy = spyOn(moduleB, "DoItB");

    const actual = moduleA.DoItA2();

    const expected = "A(B2)";
    expect(actual).toBe(expected);
  });
});
