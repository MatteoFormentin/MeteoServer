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
var device = require('express-device');
var util = require('util');

error = require('./utils/error_handler');

uuidv4 = require('uuid/v4');
crypto = require('crypto');

async = require('async');
dateConvert = require('./utils/date_convert');
meteoUtils = require('./utils/meteo_utils');

WORKING_DIR = __dirname;

/*DATABASE MySQL*/
var mysql = require('mysql');
var db_config = require('./config/db_config.json');
database = mysql.createConnection({
    host: db_config.host,
    database: db_config.database,
    user: db_config.user,
    password: db_config.password
});

database.connect(function (err) {
    if (err) {
        console.error("Can't connect to database. Check configuration.");
        process.exit();
    }
});
database.asynchQuery = util.promisify(database.query);
var initTables = require('./config/init_tables.js'); //Modulo che crea le tabelle
initTables();
db = require('./database/database.js');

/*REDIS CACHING DB
redis = require('redis');
redis_client = redis.createClient();
redis_client.hgetallAsynch = util.promisify(redis_client.hgetall);*/

/*PASSPORT*/
passport = require("passport");
var initPassport = require("./config/init_passport");
isAuthenticated = require("./routes/web/user/is_auth");
isAdmin = require("./routes/web/user/is_admin");
initPassport();

/*Express*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(compression());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 3600000 //One hour login max (in millisecond)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(device.capture());

/*Web Routing*/
var indexRouter = require('./routes/web/index');
var kioskRouter = require('./routes/web/kiosk');
var history = require('./routes/web/history');
var map = require('./routes/web/map');
var login = require('./routes/web/user/login');
var logout = require('./routes/web/user/logout');
var new_user = require('./routes/web/user/new_user');
var modify_user = require('./routes/web/user/modify_user');
var delete_user = require('./routes/web/user/delete_user');
var configuration = require('./routes/web/config/configuration');
var configuration_new_station = require('./routes/web/config/station/new_station');
var configuration_delete_station = require('./routes/web/config/station/delete_station');
var configuration_modify_station = require('./routes/web/config/station/modify_station');
var configuration_delete_data = require('./routes/web/config/delete_data');

app.use('/', indexRouter);
app.use('/kiosk', kioskRouter);
app.use('/history', history);
app.use('/map', map);

app.use('/login', login);
app.use('/logout', logout);
app.use('/user/new_user', new_user);
app.use('/user/modify_user', modify_user);
app.use('/user/delete_user', delete_user);

app.use('/config/configuration', configuration);
app.use('/config/station/new_station', configuration_new_station);
app.use('/config/station/delete_station', configuration_delete_station);
app.use('/config/station/modify_station', configuration_modify_station);

app.use('/config/delete_data', configuration_delete_data);


/*API Routing*/
var postData = require('./routes/api/post_data');
var api_station = require('./routes/api/station');
var firmw_updater = require('./routes/api/update');

app.use('/api/post_data', postData);
app.use('/api/station/', api_station);
app.use('/api/update', firmw_updater);

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
