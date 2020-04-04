var express = require('express');

module.exports.getAllFirmwareUpdates = async function () {

    var query = 'SELECT * FROM FirmwareUpdate'
    let f_u = [];
    try {
        let res = await database.asynchQuery(query);
        for(item of res) {
            f_u.push({
                id: item.Id,
                model: item.Model,
                version: item.Version,
                file_name: item.FileName,
                stamp: item.Stamp
            });
        }
    } catch (err) {
        logger.error("DATABASE: Error getting all firmware updates");
        throw err;
    }
    return f_u;
}

