var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/vms";

router.get('/', function(req, res, next) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        console.log("vms-数据库已创建!");
        db.close();
    });
});

module.exports = router;