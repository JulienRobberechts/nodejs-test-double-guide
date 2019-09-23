"use strict";
jest.mock("../lib/moduleB", () => ({
  DoItB: jest.fn()
}));

const moduleA = require("../lib/moduleA");
const moduleBMocked = require("../lib/moduleB");

beforeEach(() => jest.clearAllMocks());

test("moduleB stub with Jest without implementation", () => {
  const actual = moduleA.DoItA();

  expect(moduleBMocked.DoItB).toHaveBeenCalled();

  const expected = "A(undefined)";
  expect(actual).toEqual(expected);
});

test("moduleB stub with Jest with implementation", () => {
  moduleBMocked.DoItB.mockReturnValueOnce("beta");

  const actual = moduleA.DoItA();

  expect(moduleBMocked.DoItB).toHaveBeenCalled();

  const expected = "A(beta)";
  expect(actual).toEqual(expected);
});

test("side effects: the method DoItA2 doesn't exist if you don't stub it.", () => {
  const callAnOtherMethod = () => {
    moduleA.DoItA2();
  };

  expect(callAnOtherMethod).toThrow("moduleB.DoItB2 is not a function");
});
