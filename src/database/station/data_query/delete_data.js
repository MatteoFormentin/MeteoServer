var express = require('express');


module.exports.deleteSingleTemperature = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Temperature WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        logger.error("DATABASE: Error deleting from Temperature item: " + id + ',' + stamp);
        throw err
    }
    return res;
}

module.exports.deleteSingleHumidity = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Humidity WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        logger.error("DATABASE: Error deleting from Humidity item: " + id + ',' + stamp + ", message: " + err.message);
        throw err
    }
    return res;
}

module.exports.deleteSinglePressure = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Pressure WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        logger.error("DATABASE: Error deleting from Pressure item: " + id + ',' + stamp);
        throw err
    }
    return res;
}

module.exports.deleteSingleRain = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Rain WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        logger.error("DATABASE: Error deleting from Rain item: " + id + ',' + stamp);
        throw err
    }
    return res;
}

module.exports.deleteSingleWind = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Wind WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        logger.error("DATABASE: Error deleting from Wind item: " + id + ',' + stamp);
        throw err
    }
    return res;
}

module.exports.deleteSingleLighting = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Lighting WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        logger.error("DATABASE: Error deleting from Lighting item: " + id + ',' + stamp);
        throw err
    }
    return res;
}


module.exports.deleteSingleAirQuality = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM AirQuality WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        logger.error("DATABASE: Error deleting from AirQuality item: " + id + ',' + stamp);
        throw err
    }
    return res;
}

