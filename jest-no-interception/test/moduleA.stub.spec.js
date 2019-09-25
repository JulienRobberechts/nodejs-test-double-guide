"use strict";
const moduleA = require("../lib/moduleA");
const moduleB = require("../lib/moduleB");

describe("Jest partial stub", () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
  test("are replacing the behavior of the the target stubbed function", () => {
    const moduleBSpy = jest
      .spyOn(moduleB, "DoItB")
      .mockImplementation(() => "beta");

    const actual = moduleA.DoItA();

    expect(moduleBSpy).toHaveBeenCalledWith();

    const expected = "A(beta)";
    expect(actual).toEqual(expected);
  });

  test("are not modifying the behavior of sibling functions", () => {
    const moduleBSpy = jest
      .spyOn(moduleB, "DoItB")
      .mockImplementation(() => "beta");

    const actual = moduleA.DoItA2();

    const expected = "A(B2)";
    expect(actual).toEqual(expected);
  });
});
