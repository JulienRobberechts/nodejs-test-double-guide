var accelerometer = require("./accelerometer");
var gasPedal = require("./gas-pedal");

module.exports = {
  goSixty: function() {
    var speed = accelerometer.read();
    gasPedal(60 - speed);
    return "OK";
  }
};
