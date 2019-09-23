"use strict";
const moduleA = require("../lib/moduleA");
const moduleB = require("../lib/moduleB");

beforeEach(() => jest.clearAllMocks());

test("module A tests with Jest stub", () => {
  const moduleBSpy = jest
    .spyOn(moduleB, "DoItB")
    .mockImplementation(() => "beta");

  const actual = moduleA.DoItA();

  expect(moduleBSpy).toHaveBeenCalledWith();

  const expected = "A(beta)";
  expect(actual).toEqual(expected);
});

test("side effect: NO, it's ok", () => {
  const moduleBSpy = jest
    .spyOn(moduleB, "DoItB")
    .mockImplementation(() => "beta");

  const actual = moduleA.DoItA2();

  const expected = "A(B2)";
  expect(actual).toEqual(expected);
});
