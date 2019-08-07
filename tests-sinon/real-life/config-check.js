var express = require('express');
var router = express.Router();
const { checkConfiguration } = require('../services/configService');

router.use(function timeLog(req, res, next) {
  console.log('request on root at ', Date.now());
  next();
});

// check config
router.get('/', async (req, res) => {
  var command = await checkConfiguration()
  res.send(command);
});

module.exports = router;
