var express = require('express');

module.exports.queryUpdateById = async function (update_id) {
    var query = 'SELECT Id, Model, Version, FileName, Stamp FROM FirmwareUpdate WHERE Id=?';
    let update;
    try {
        let res = await database.asynchQuery(query, [
            update_id
        ]);

        if (res.length == 0) {
            update = undefined;
        } else {
            update = {
                id: res[0].Id,
                model: res[0].Model,
                version: res[0].Version,
                file_name: res[0].FileName
            };
        }
    }
    catch (err) {
        logger.error("DATABASE: Error quering firmware update available by id: " + id);
        throw err;
    }
    return update;
}