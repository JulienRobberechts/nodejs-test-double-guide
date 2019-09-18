var subject, gasPedal, accelerometer, Brake;

module.exports = {
  beforeEach: function() {
    gasPedal = td.replace("../../lib/gas-pedal"); // <-- a plain ol' function
    accelerometer = td.replace("../../lib/accelerometer"); // <-- an obj of functions
    Brake = td.replace("../../lib/brake"); // <-- a constructor function
    td.replace("../../lib/copilot", function() {
      return "HIGHFIVE";
    }); // <-- a manual override
    subject = require("../../lib/car");
  },

  ".goSixty": {
    "not yet going 60 -> pushes the pedal down 5 units": function() {
      td.when(accelerometer.read()).thenReturn(55);

      subject.goSixty();

      td.verify(gasPedal(5));
    }
  }
};
