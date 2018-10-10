var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var helmet = require('helmet');
var session = require("express-session");
uuidv4 = require('uuid/v4');
async = require('async');
dateConvert = require('./utils/date_convert');
meteoUtils = require('./utils/meteo_utils');


/*DATABASE MySQL*/
var mysql = require('mysql');
var db_config = require('./config/db_config.json');
database = mysql.createConnection({
    host: db_config.host,
    database: db_config.database,
    user: db_config.user,
    password: db_config.password
});

var initTables = require('./config/init_tables.js'); //Modulo che crea le tabelle
database.connect(function (err) {
    if (err) {
        console.error("Can't connect to database. Check configuration.");
        process.exit();
    }
});

initTables();

/*PASSPORT*/
passport = require("passport");
var initPassport = require("./config/init_passport");
isAuthenticated = require("./routes/user/is_auth");

initPassport();

var indexRouter = require('./routes/index');
var kioskRouter = require('./routes/kiosk');
var postData = require('./routes/post_data');
var history = require('./routes/history');
var login = require('./routes/user/login');
var logout = require('./routes/user/logout');
var new_user = require('./routes/user/new_user');
var modify_user = require('./routes/user/modify_user');
var delete_user = require('./routes/user/delete_user');
var configuration = require('./routes/config/configuration');
var configuration_new_station = require('./routes/config/station/new_station');
var configuration_delete_station = require('./routes/config/station/delete_station');
var configuration_modify_station = require('./routes/config/station/modify_station');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000 //One hour login max (in millisecond)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/', indexRouter);
app.use('/kiosk', kioskRouter);
app.use('/post_data', postData);
app.use('/history', history);

app.use('/login', login);
app.use('/logout', logout);
app.use('/user/new_user', new_user);
app.use('/user/modify_user', modify_user);
app.use('/user/delete_user', delete_user);

app.use('/config/configuration', configuration);
app.use('/config/station/new_station', configuration_new_station);
app.use('/config/station/delete_station', configuration_delete_station);
app.use('/config/station/modify_station', configuration_modify_station);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
