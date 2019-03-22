var express = require('express');

var queryLastDataFromAllStation = require('./station/query_last_data_from_all_station');
var querySingleStationLastData = require('./station/query_single_station_last_data');
var listStation = require('./station/list_station');
var updateStationData = require('./station/update_station_data');
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
    loginUser,
    getUserById,
    deleteUser,
    createUser,
    modifyUser
);


