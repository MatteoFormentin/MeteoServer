var express = require('express');

module.exports.queryUpdateAvailable = async function (model) {
    var query = 'SELECT Id, Model, Version, FileName, Stamp FROM FirmwareUpdate WHERE Model=? ORDER BY Stamp DESC';

    let rows = await database.asynchQuery(query, [
        model
    ]);

    if (rows[0]) {
        var station_update_available =
        {
            id: rows[0].Id,
            model: rows[0].Model,
            version: rows[0].Version,
            file_name: rows[0].FileName
        };
        return station_update_available;
    }
    return false;
}