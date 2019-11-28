var express = require('express');

module.exports.createFirmwareUpdate = async function (model, version, file_name) {
    var query = 'INSERT INTO FirmwareUpdate(Model, Version, FileName, Stamp) VALUES (?, ?, ?, ?)';
    database.asynchQuery(query, [
        model,
        version,
        file_name,
        dateConvert.dateToTimeStampSecond(new Date())
    ]);
}