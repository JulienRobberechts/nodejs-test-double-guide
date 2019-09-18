var td = require("testdouble");
var chai = require("chai");
var expect = chai.expect;

var gasPedal, accelerometer;
var car;

describe("goSixty", function() {
  beforeEach(function() {
    gasPedal = td.replace("../lib/gas-pedal"); // <-- a plain ol' function
    accelerometer = td.replace("../lib/accelerometer"); // <-- an obj of functions
    car = require("../lib/car");
  });

  it("not yet going 60 -> pushes the pedal down 5 units", function() {
    // Arrange
    td.when(accelerometer.read()).thenReturn(55);

    // Act
    const actual = car.goSixty();

    // Assert 1: dependency accelerometer has been called
    td.verify(accelerometer.read());

    // Assert 2: dependency gasPedal has been called with param 5
    const expectedGasPedalParameter = 5;
    td.verify(gasPedal(expectedGasPedalParameter));

    // Assert 3: result is "OK"
    const expectedResult = "OK";
    expect(actual).to.equal(expectedResult);
  });
  afterEach(function() {
    td.reset();
  });
});
