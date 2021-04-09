var express = require('express');
const { v4: uuidv4 } = require('uuid');


module.exports.createStation = async function (station_name, location, latitude, longitude, altitude) {

    let timestamp = moment.utc().format("Y-M-D H:mm");
    var query = 'INSERT INTO Station (StationName, Location, Latitude, Longitude, Altitude, Token, LastUpdate) VALUES (?, ?, ?, ?, ?, ?, ?)'
    let res;
    try {
        res = await database.asynchQuery(query, [
            station_name,
            location,
            latitude,
            longitude,
            altitude,
            uuidv4(),
            timestamp
        ]);
    } catch (err) {
        logger.error("DATABASE: Error creating station, message: " + err.message);
        throw err;
    }
    return res;
}

