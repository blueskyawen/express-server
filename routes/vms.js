var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var mongoClient = new MongoClient(url,{ useNewUrlParser: true, useUnifiedTopology: true });
var Mock = require('mockjs');

const dbName = "cloudenv";

router.get('/', function(req, res, next) {
    MongoClient.connect(url,{ useNewUrlParser: true},function(err, db) {
        if (err) throw err;
        db.db(dbName).collection("vms").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.send(result);
        });
    });
});

router.post('/add', function(req, res, next) {
    MongoClient.connect(url, { useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        db.db(dbName).collection("vms").insertOne(req.body, function (err, result) {
            if (err) throw err;
            db.close();
            res.send("文档插入成功");
        });
    });
});

router.put('/:id', function(req, res, next) {
    MongoClient.connect(url,{ useNewUrlParser: true},function(err, db) {
        if (err) throw err;
        db.db(dbName).collection("vms").updateOne({id: req.params.id}, {$set: req.body},function (err, result) {
            if (err) throw err;
            db.close();
            res.send("文档Modify成功");
        });
    });
});

router.delete('/:id', function(req, res, next) {
    MongoClient.connect(url,{ useNewUrlParser: true},function(err, db) {
        if (err) throw err;
        db.db(dbName).collection("vms").deleteOne({id: req.params.id}, function (err, result) {
            if (err) throw err;
            db.close();
            res.send("文档Delete成功");
        });
    });
});

router.get('/:id', function(req, res, next) {
    MongoClient.connect(url,{ useNewUrlParser: true},function(err, db) {
        if (err) throw err;
        db.db(dbName).collection("vms").find({id: req.params.id}).limit(1).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.send(result);
        });
    });
});

module.exports = router;

