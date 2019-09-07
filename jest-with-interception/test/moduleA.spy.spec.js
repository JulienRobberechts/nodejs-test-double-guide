jest.mock("../lib/moduleB", () => ({
  DoItB: jest.fn()
}));

const moduleA = require("../lib/moduleA");
const moduleBMocked = require("../lib/moduleB");

beforeEach(() => jest.clearAllMocks());

// in fact the behavior is modified it's not really a spy.
// when there is interception, it's not a spy??
test("moduleB can't be spied without changing the behaviour Jest without implementation", () => {
  expect(moduleA.DoItA()).toEqual("A(undefined)");
  expect(moduleBMocked.DoItB).toHaveBeenCalled();
});
