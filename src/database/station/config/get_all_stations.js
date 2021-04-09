var express = require('express');

module.exports.getAllStations = async function () {
    let timestamp = moment.utc().format("Y-M-D H:mm");
    var query = 'SELECT * FROM Station'
    let station = [];
    try {
        let res = await database.asynchQuery(query);
        for (item of res) {
            station.push({
                id: item.Id,
                name: item.StationName,
                location: item.Location,
                latitude: item.Latitude,
                longitude: item.Longitude,
                altitude: item.Altitude,
                model: item.Model,
                firmware_version: item.FirmwareVersion,
                token: item.Token,
                last_update: item.LastUpdate
            });
        }
    } catch (err) {
        logger.error("DATABASE: Error getting all station , message: " + err.message);
        throw err;
    }
    return station;
}

