var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*',function (req,res,next) {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
    res.header('Content-Type','application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req,res,next) {
    next(createError(404));
});
app.use(function (err,req,res,next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env')==='development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

