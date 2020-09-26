var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');

/*var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vmsRouter = require('./routes/vms');*/
var authRouter = require('./routes/author');
var clusterRouter = require('./routes/cluster');
var alarmRouter = require('./routes/alarm');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*',function (req,res,next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,language-option');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('X-Powered-By', ' 3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
});

/*app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vms', vmsRouter);*/
app.use('/api/author', authRouter);
app.use('/api/cluster', clusterRouter);
app.use('/api/alarm', alarmRouter);


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;

