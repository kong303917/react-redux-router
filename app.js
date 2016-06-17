const express = require('express')
const path = require('path')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
//const RedisStore = require('connect-redis')(session);


const ReactRouter = require('./routes/server');
const users = require('./routes/users');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//var onemonth = 60 * 1000 * 60 * 24 * 30;
//
//var redisStore = new RedisStore({
//    "host": '127.0.0.1',
//    "port": '6379',
//    "ttl": 60 * 60 * 1,   //Session的有效期为1小时
//});
//app.use(session({
//    secret: 'wechat',
//    cookie: {maxAge: 60 * 60 * 24 * 1000}, //一天
//    resave: false,
//    saveUninitialized: true,
//    store: redisStore
//}));

app.use(session({
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true
}));


// 通常用于加载静态资源
//console.log(path.resolve('public'));
//console.log('__filename:'+ path.resolve(__filename));
//console.log('__dirname:'+ path.resolve(__dirname));
//console.log(process.cwd());
app.use('/public',express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/', ReactRouter);


// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});
//
//// error handlers
//
//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}
//
//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});


module.exports = app;
