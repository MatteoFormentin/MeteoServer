var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var helmet = require("helmet");
var session = require("express-session");
var device = require("express-device");
var MySQLStore = require('express-mysql-session')(session);

moment = require('moment')
const { v4: uuidv4 } = require('uuid');
crypto = require("crypto");
async = require("async");
WORKING_DIR = __dirname;


logger = require("./utils/logger");
meteoUtils = require('./utils/meteo_utils')
dateConvert = require('./utils/date_convert')

/*DATABASE MySQL*/
db = require("./database/database");

/*PASSPORT*/
passport = require("passport");
var initPassport = require("./passport/init_passport");
isAuthenticated = require("./passport/is_auth");
isAdmin = require("./passport/is_admin");
initPassport();

/*Express*/
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(helmet());
app.use(compression());

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var sessionStore = new MySQLStore({}, database);

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 24 * 3600000 //One hour login max (in millisecond)
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(device.capture());

/*Web Routing*/
var indexRouter = require("./routes/web/index");
var history = require("./routes/web/history");
var station = require("./routes/web/station");

var map = require("./routes/web/map");
var login = require("./routes/web/user/login");
var logout = require("./routes/web/user/logout");
var new_user = require("./routes/web/user/new_user");
var modify_user = require("./routes/web/user/modify_user");
var delete_user = require("./routes/web/user/delete_user");
var configuration = require("./routes/web/config/configuration");
var configuration_new_station = require("./routes/web/config/station/new_station");
var configuration_delete_station = require("./routes/web/config/station/delete_station");
var configuration_modify_station = require("./routes/web/config/station/modify_station");
var configuration_delete_data = require("./routes/web/config/delete_data");
var configuration_new_update = require("./routes/web/config/firmware_update/new_update");
var configuration_delete_update = require("./routes/web/config/firmware_update/delete_update");

app.use("/", indexRouter);
app.use("/history", history);
app.use("/station", station);
app.use("/map", map);

app.use("/login", login);
app.use("/logout", logout);
app.use("/user/new_user", new_user);
app.use("/user/modify_user", modify_user);
app.use("/user/delete_user", delete_user);

app.use("/config/configuration", configuration);
app.use("/config/station/new_station", configuration_new_station);
app.use("/config/station/delete_station", configuration_delete_station);
app.use("/config/station/modify_station", configuration_modify_station);

app.use("/config/firmware_update/new_update", configuration_new_update);
app.use("/config/firmware_update/delete_update", configuration_delete_update);

app.use("/config/delete_data", configuration_delete_data);

/*API Routing*/
var update = require("./routes/api/update");
var api_station = require("./routes/api/station");
var firmw_updater = require("./routes/api/firmware_update");

//Data posting
app.use("/api/update", update);
app.use("/api/station", api_station);
app.use("/api/firmware_update", firmw_updater);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  logger.error("GENERIC ERROR: " + err.message)
  res.locals.message = err.message;
  process.exit(-1)
});

logger.info("APP: Starting completed. MeteoServer Ready.");

app.listen(3000);