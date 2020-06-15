var express = require('express');
var router = express.Router();
// var users = require('../public/data/users');
var fs = require("fs");

var user = {
  "user4" : {
    "name" : "mohit",
    "password" : "password4",
    "profession" : "teacher",
    "id": 4
  }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send(users);
  fs.readFile(__dirname + "/../public/data/users.json", 'utf8', function (err, data) {
    res.end( data );
  });
});

router.get('/add', function (req, res) {
  // 读取已存在的数据
  fs.readFile(__dirname + "/../public/data/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    data["user4"] = user["user4"];
    fs.writeFile(__dirname + "/../public/data/users.json", JSON.stringify(data), function(err) {
      if (err) {
        return console.error(err);
      }
    });
    res.send(data);
  });
});

router.get('/:id', function (req, res) {
  // 首先我们读取已存在的用户
  fs.readFile(__dirname + "/../public/data/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    var user = data["user" + req.params.id];
    res.end(JSON.stringify(user));
  });
});

router.get('/del/:id', function (req, res) {
  fs.readFile(__dirname + "/../public/data/users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    if (data["user"+req.params.id]) {
      delete data["user" + req.params.id];
      res.end(JSON.stringify(data));
    } else {
      res.status(404).end();
    }
  });
})


module.exports = router;
