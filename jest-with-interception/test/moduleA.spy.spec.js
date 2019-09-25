"use strict";
// intercept moduleB.DoItB everywhere with proxyquire
jest.mock("../lib/moduleB", () => ({
  DoItB: jest.fn()
}));

const moduleA = require("../lib/moduleA");
const moduleBMocked = require("../lib/moduleB");

describe("Jest intercepted spies", () => {
  beforeEach(() => jest.clearAllMocks());

  test("moduleB can't be spied without changing the behaviour Jest without implementation", () => {
    const actual = moduleA.DoItA();

    expect(moduleBMocked.DoItB).toHaveBeenCalled();

    const expected = "A(undefined)";
    expect(actual).toEqual(expected);
  });

  test("are not aware of sibling functions anymore", () => {
    const callAnOtherMethod = () => {
      moduleA.DoItA2();
    };

    expect(callAnOtherMethod).toThrow("moduleB.DoItB2 is not a function");
  });
  afterEach(() => jest.clearAllMocks());
});
