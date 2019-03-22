var express = require('express');

module.exports.listStation = async function () {
    let station = await database.asynchQuery('SELECT Id, StationName, Location, Latitude, Longitude, Altitude FROM Station');
    return station;
}