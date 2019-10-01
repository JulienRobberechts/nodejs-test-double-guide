"use strict";
// 1. intercept moduleB.DoItB everywhere with jest
jest.mock("../lib/moduleB", () => ({
  DoItB: jest.fn()
}));

// 2. import your component under test afterwards
const moduleA = require("../lib/moduleA");
// 3. import the stub reference as you would do with the original dependency.
const moduleBMocked = require("../lib/moduleB");

describe("Jest intercepted stub", () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());
  test("moduleB stub with Jest with implementation", () => {
    moduleBMocked.DoItB.mockReturnValueOnce("beta");

    const actual = moduleA.DoItA();

    expect(moduleBMocked.DoItB).toHaveBeenCalled();

    const expected = "A(beta)";
    expect(actual).toEqual(expected);
  });

  test("are not aware of sibling functions anymore", () => {
    const callAnOtherMethod = () => {
      moduleA.DoItA2();
    };

    expect(callAnOtherMethod).toThrow("moduleB.DoItB2 is not a function");
  });
});
