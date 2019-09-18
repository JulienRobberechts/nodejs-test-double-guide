var td = require("testdouble");
var chai = require("chai");
var expect = chai.expect;

var subject, gasPedal, accelerometer, Brake;

describe("moduleB.DoItB intercepted and stub by testdouble", function() {
  beforeEach(function() {
    gasPedal = td.replace("../../lib/gas-pedal"); // <-- a plain ol' function
    accelerometer = td.replace("../../lib/accelerometer"); // <-- an obj of functions
    Brake = td.replace("../../lib/brake"); // <-- a constructor function
    td.replace("../../lib/copilot", function() {
      return "HIGHFIVE";
    }); // <-- a manual override
    subject = require("../../lib/car");
  });

  describe("goSixty", function() {
    it("not yet going 60 -> pushes the pedal down 5 units", function() {
      td.when(accelerometer.read()).thenReturn(55);

      subject.goSixty();

      td.verify(gasPedal(5));
    });
  });
});
