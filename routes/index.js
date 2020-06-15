var express = require('express');
var router = express.Router();
var Mock = require('mockjs');

var Random = Mock.Random

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(Mock.mock({
    "status":200,
    "data|1-9":[{
      "name|5-8":/\w/,
      "id": Random.uuid(),
      "value|0-500":24
    }]
  }))
});

module.exports = router;

