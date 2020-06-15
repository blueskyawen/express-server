var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/vms";
var mongoClient = new MongoClient(url,{ useNewUrlParser: true });

router.get('/', function(req, res, next) {
    mongoClient.connect(function(err, db) {
        if (err) throw err;
        console.log("vms-数据库已创建!");
        db.close();
    });
});

module.exports = router;