var express = require('express');

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
        logger.error("Error creating station");
        throw err;
    }
    return res;
}

