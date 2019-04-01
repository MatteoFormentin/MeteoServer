var express = require('express');


//STATION DATA
var queryLastDataFromAllStation = require('./station/data_query/query_last_data_from_all_station');
var querySingleStationLastData = require('./station/data_query/query_single_station_last_data');
var listStation = require('./station/data_query/list_station');
var updateStationData = require('./station/data_query/update_station_data');
var queryHistoryStationData = require('./station/data_query/query_history_station_data');

//USER
var deleteUser = require('./user/delete_user')
var loginUser = require('./user/login_user')
var getUserById = require('./user/get_user_by_id')
var createUser = require('./user/create_user')
var modifyUser = require('./user/modify_user')




module.exports = Object.assign({},
    queryLastDataFromAllStation,
    querySingleStationLastData,
    listStation,
    updateStationData,
    queryHistoryStationData,
    loginUser,
    getUserById,
    deleteUser,
    createUser,
    modifyUser
);


