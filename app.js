var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');
uuidv4 = require('uuid/v4');
async = require('async')
dateConvert = require('./utils/date_convert');
meteoUtils = require('./utils/meteo_utils');


/*DATABASE MySQL*/
var mysql = require('mysql');
var db_config = require('./db_config/db_config.json');
database = mysql.createConnection({
    host: db_config.host,
    database: db_config.database,
    user: db_config.user,
    password: db_config.password
});

var init_tables = require('./db_config/init_tables.js'); //Modulo che crea le tabelle
database.connect();
init_tables();


var indexRouter = require('./routes/index');
var postData = require('./routes/post_data');
var history = require('./routes/history');
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


app.use('/', indexRouter);
app.use('/post_data', postData);
app.use('/history', history);
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
