var express = require('express');

module.exports.getAllFirmwareUpdates = async function () {

    var query = 'SELECT * FROM FirmwareUpdate'
    let res;
    try {
        res = await database.asynchQuery(query);
    } catch (err) {
        logger.error("Error getting all firmware updates");
        throw err;
    }
    return res;
}

