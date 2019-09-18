var td = require("testdouble");
var chai = require("chai");
var expect = chai.expect;

// you can't declare the system under test before replacing the dependencies:
var car = require("../lib/car");

var gasPedal, accelerometer;

describe("goSixty", function() {
  beforeEach(function() {
    gasPedal = td.replace("../lib/gas-pedal"); // <-- a plain ol' function
    accelerometer = td.replace("../lib/accelerometer"); // <-- an obj of functions

    // The correct way would be to call require after replacing the dependencies:
    // car = require("../lib/car");
  });

  it("not yet going 60 -> pushes the pedal down 5 units", function() {
    td.when(accelerometer.read()).thenReturn(55);

    try {
      const actual = car.goSixty();
    } catch (error) {
      console.log(
        "Expected unimplemented error because the system under test was declared before the replacing the dependencies:",
        error.message
      );
    }
  });
  afterEach(function() {
    td.reset();
  });
});
