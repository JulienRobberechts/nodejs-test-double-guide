// jest.mock("../lib/moduleB", () => ({
//   DoItB: jest.fn()
// }));

// const moduleA = require("../lib/moduleA");
// const moduleBMocked = require("../lib/moduleB");

// beforeEach(() => jest.clearAllMocks());

// test("moduleB stub with Jest without implementation", () => {
//   const expected = 'A(undefined)';
//   const actual = moduleA.DoItA();
//   expect(actual).toEqual(expected);
//   expect(moduleBMocked.DoItB).toHaveBeenCalled();
// });

// test("moduleB stub with Jest with implementation", () => {
//   moduleBMocked.DoItB.mockReturnValueOnce('beta');
//   const actual = moduleA.DoItA();
//   expect(actual).toEqual("A(beta)");
//   expect(moduleBMocked.DoItB).toHaveBeenCalled();
// });
