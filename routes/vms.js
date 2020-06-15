var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/vms";
var mongoClient = new MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true });
var Mock = require('mockjs');

const dbName = "cloudenv";

router.get('/', function(req, res, next) {
    mongoClient.connect(function(err, db) {
        if (err) throw err;
        var addVm = {id: "001", name: "my-vm", status: "active"};
        db.db(dbName).collection("vms").insertOne(addVm, function (err, res2) {
            if (err) throw err;
            console.log("文档插入成功");
            db.close();
            res.send(addVm);
        });
    });
});


module.exports = router;

