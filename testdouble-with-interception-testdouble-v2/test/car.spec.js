var td = require("testdouble");
var chai = require("chai");
var expect = chai.expect;

var car, gasPedal, accelerometer;

describe("goSixty", function() {
  beforeEach(function() {
    gasPedal = td.replace("../lib/gas-pedal"); // <-- a plain ol' function
    accelerometer = td.replace("../lib/accelerometer"); // <-- an obj of functions
    car = require("../lib/car");
  });

  it("not yet going 60 -> pushes the pedal down 5 units", function() {
    td.when(accelerometer.read()).thenReturn(55);

    const actual = car.goSixty();

    const expectedResult = "OK";
    expect(actual).to.equal(expectedResult);

    const expectedGasPedalParameter = 5;
    td.verify(gasPedal(expectedGasPedalParameter));
  });
});
