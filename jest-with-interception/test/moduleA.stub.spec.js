"use strict";
// intercept moduleB.DoItB everywhere with proxyquire
jest.mock("../lib/moduleB", () => ({
  DoItB: jest.fn()
}));

const moduleA = require("../lib/moduleA");
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
