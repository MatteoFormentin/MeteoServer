var express = require('express');

var queryLastDataFromAllStation = require('./query_last_data_from_all_station');
var querySingleStationLastData = require('./query_single_station_last_data');

module.exports = Object.assign({}, queryLastDataFromAllStation, querySingleStationLastData);


