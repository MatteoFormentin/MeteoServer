var express = require('express');

module.exports.createFirmwareUpdate = async function (model, version, file_name) {
    var query = 'INSERT INTO FirmwareUpdate(Model, Version, FileName, Stamp) VALUES (?, ?, ?, ?)';
    let res;
    try {
        res = await database.asynchQuery(query, [
            model,
            version,
            file_name,
            moment.utc().format("Y-M-D H:mm")
        ]);
    } catch (err) {
        logger.error("DATABASE: Error creating firmware update");
        throw err;
    }
    return res
}