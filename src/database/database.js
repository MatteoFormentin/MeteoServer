var express = require('express');


//STATION DATA
var queryLastDataFromAllStation = require('./station/data_query/query_last_data_from_all_station');
var querySingleStationLastData = require('./station/data_query/query_single_station_last_data');
var listStation = require('./station/data_query/list_station');
var updateStationData = require('./station/data_query/update_station_data');
var queryHistoryStationData = require('./station/data_query/query_history_station_data');
var deleteData = require('./station/data_query/delete_data');

//STATION
var createStation = require('./station/config/create_station');
var deleteStation = require('./station/config/delete_station');
var getAllStations = require('./station/config/get_all_stations');
var modifyStation = require('./station/config/modify_station');

//USER
var deleteUser = require('./user/delete_user');
var loginUser = require('./user/login_user');
var getUserById = require('./user/get_user_by_id');
var createUser = require('./user/create_user');
var modifyUser = require('./user/modify_user');
var getAllUsers = require('./user/get_all_users');

//FIRMWARE UPDATE
var queryUpdateAvailable = require('./firmware_update/query_update_available');
var createFirmwareUpdate = require('./firmware_update/create_firmware_update');
var deleteFirmwareUpdate = require('./firmware_update/delete_firmware_update');
var queryUpdateById = require('./firmware_update/query_update_by_id');
var getAllFirmwareUpdates = require('./firmware_update/get_all_firmware_updates');


var mysql = require("mysql");
var util = require("util");

if (process.env.DB_HOST == "" || process.env.DB_NAME == "" || process.env.USER_DB == "" || process.env.PASS_DB == "") {
    logger.error("ENV: Missing some enviroment variables.");
    process.exit();
}


database = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    timezone: 'utc'
});


database.connect(function (err) {
    if (err) {
        logger.error("DATABASE: Can't connect to database. Check configuration.");
        logger.error(err);
        process.exit();
    }
});

logger.info("DATABASE: Connected to SQL database " + process.env.DB_NAME + " at " + process.env.DB_HOST);

database.asynchQuery = util.promisify(database.query);

var initTables = require("./init_tables");
initTables().catch((err) => {
    logger.error("DATABASE: Error initializing tables, message: " + err.message)
    process.exit();
})

module.exports = Object.assign({},
    database,
    queryLastDataFromAllStation,
    querySingleStationLastData,
    listStation,
    updateStationData,
    queryHistoryStationData,
    deleteData,
    createStation,
    deleteStation,
    getAllStations,
    modifyStation,
    loginUser,
    getUserById,
    deleteUser,
    createUser,
    modifyUser,
    getAllUsers,
    queryUpdateAvailable,
    queryUpdateById,
    createFirmwareUpdate,
    deleteFirmwareUpdate,
    getAllFirmwareUpdates
);


