var express = require('express');


module.exports.listStation = async function () {
    let station = [];
    try {
        let rows = await database.asynchQuery('SELECT Id, StationName, Location, Latitude, Longitude, Altitude FROM Station');
        for (item of rows) {
            station.push({
                id: item.Id,
                name: item.StationName,
                location: item.Location,
                latitude: item.Latitude,
                longitude: item.Longitude,
                altitude: item.Altitude
            });
        }
    } catch (err) {
        logger.error("DATABASE: Error getting all station (list)");
        throw err;
    }
    return station;
}