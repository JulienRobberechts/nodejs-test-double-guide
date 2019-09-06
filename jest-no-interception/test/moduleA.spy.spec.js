const moduleA = require("../lib/moduleA");
const moduleB = require("../lib/moduleB");

beforeEach(() => jest.clearAllMocks());

test("module A tests with Jest spy", () => {
  const moduleBSpy = jest.spyOn(moduleB, "DoItB");
  moduleA.DoItA();
  expect(moduleBSpy).toHaveBeenCalledWith();
});
