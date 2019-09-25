"use strict";
const moduleA = require("../lib/moduleA");
const moduleB = require("../lib/moduleB");

describe("Jest partial spies", () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
  test("are NOT changing the behavior of the target spied function", () => {
    // partial spy with jest
    const moduleBSpy = jest.spyOn(moduleB, "DoItB");

    const actual = moduleA.DoItA();

    expect(moduleBSpy).toHaveBeenCalledWith();

    const expected = "A(B)";
    expect(actual).toEqual(expected);
  });

  test("are not modifying the behavior of sibling functions", () => {
    const moduleBSpy = jest.spyOn(moduleB, "DoItB");

    const actual = moduleA.DoItA2();

    const expected = "A(B2)";
    expect(actual).toEqual(expected);
  });
});
