var express = require('express');

module.exports.getAllStations = async function () {
    let timestamp = moment.utc().format("Y-M-D H:mm");
    var query = 'SELECT * FROM Station'
    let res;
    try {
        res = await database.asynchQuery(query);
    } catch (err) {
        logger.error("Error getting all station");
        throw err;
    }
    return res;
}

