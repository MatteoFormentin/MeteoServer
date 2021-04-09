var express = require('express');


module.exports.modifyStation = async function (station_name, location, latitude, longitude, altitude, id) {
    var query = 'UPDATE Station SET StationName=?, Location=?, Latitude=?, Longitude=?, Altitude=? WHERE Id=?';
    let res;
    try {
        res = await database.asynchQuery(query, [
            station_name,
            location,
            latitude,
            longitude,
            altitude,
            id
        ]);
    } catch (err) {
        logger.error("DATABASE: Error Updating Station: " + station_name + ", message: " + err.message);
        throw err
    }
    return res
}