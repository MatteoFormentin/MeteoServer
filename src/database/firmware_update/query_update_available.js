var express = require('express');

module.exports.queryUpdateAvailable = async function (model) {
    var query = 'SELECT Id, Model, Version, FileName, Stamp FROM FirmwareUpdate WHERE Model=? ORDER BY Stamp DESC';
    let station_update_available;
    try {
        let res = await database.asynchQuery(query, [
            model
        ]);

        if (res == undefined) {
            station_update_available = undefined;
        } else {
            station_update_available = {
                id: res[0].Id,
                model: res[0].Model,
                version: res[0].Version,
                file_name: res[0].FileName
            };
        }
    } catch (err) {
        logger.error("DATABASE: Error quering for firmware update available by model: " + model);
        throw err;
    }
    return station_update_available;
}