var express = require('express');

module.exports.createUser = async function (model, version, path) {
    var query = 'INSERT INTO FirmwareUpdate(Model, Version, Path, Stamp) VALUES (?, ?, ?, ?)';
    database.asynchQuery(query, [
        model,
        version,
        path,
        dateConvert.dateToTimeStampSecond(new Date())
    ]);
}