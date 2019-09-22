jest.mock("../lib/moduleB", () => ({
  DoItB: jest.fn()
}));

const moduleA = require("../lib/moduleA");
const moduleBMocked = require("../lib/moduleB");

beforeEach(() => jest.clearAllMocks());

// in fact the behavior is modified it's not really a spy.
// when there is interception, it's not a spy??
test("moduleB can't be spied without changing the behaviour Jest without implementation", () => {
  const actual = moduleA.DoItA();
  
  expect(moduleBMocked.DoItB).toHaveBeenCalled();

  // In fact the behavior is modified it's not really a spy,
  // just a mock with, it's just a stub with empty behavior.
  const expected = "A(undefined)";
  expect(actual).toEqual(expected);
});

test("side effect: the method DoItA2 doesn't exist if you don't stub it.", () => {
  const callAnOtherMethod = () => {
    moduleA.DoItA2();
  };

  expect(callAnOtherMethod).toThrow('moduleB.DoItB2 is not a function');
});
