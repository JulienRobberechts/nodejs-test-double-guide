const moduleA = require("../lib/moduleA");
const moduleB = require("../lib/moduleB");

beforeEach(() => jest.clearAllMocks());

test("module A tests with Jest spy: the behavior is not modified = good spy", () => {
  const moduleBSpy = jest.spyOn(moduleB, "DoItB");

  const actual = moduleA.DoItA();

  expect(moduleBSpy).toHaveBeenCalledWith();

  const expected = "A(B)";
  expect(actual).toEqual(expected);
});

test("DoItA2: no side effect", () => {
  const moduleBSpy = jest.spyOn(moduleB, "DoItB");

  const actual = moduleA.DoItA2();

  const expected = "A(B2)";
  expect(actual).toEqual(expected);
});