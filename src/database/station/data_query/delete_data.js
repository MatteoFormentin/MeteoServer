var express = require('express');


module.exports.deleteSingleTemperature = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Temperature WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        throw err
        //log
    }
    return res;
}

module.exports.deleteSingleHumidity = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Humidity WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        throw err

        //log
    }

    return res;
}

module.exports.deleteSinglePressure = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Pressure WHERE Id = ? AND Stamp = ?');
    } catch (err) {
        throw err

        //log
    }

    return res;
}

module.exports.deleteSingleRain = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Rain WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        throw err

        //log
    }

    return res;
}

module.exports.deleteSingleWind = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Wind WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        throw err

        //log
    }
    return res;
}

module.exports.deleteSingleLighting = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM Lighting WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        throw err

        //log
    }

    return res;
}


module.exports.deleteSingleAirQuality = async function (id, stamp) {
    let res;
    try {
        res = await database.asynchQuery('DELETE FROM AirQuality WHERE Id = ? AND Stamp = ?', [id, stamp]);
    } catch (err) {
        throw err

        //log
    }

    return res;
}

