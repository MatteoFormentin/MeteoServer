var express = require('express');


module.exports.modifyStation = async function (station_name, location, latitude, longitude, altitude) {
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
        logger.error("Error Updating User: " + email);
        throw err
    }
    return res
}