var express = require('express');

module.exports.queryUpdateById = async function (update_id) {
    var query = 'SELECT Id, Model, Version, FileName, Stamp FROM FirmwareUpdate WHERE Id=?';

    let rows = await database.asynchQuery(query, [
        update_id
    ]);

    if (rows[0]) {
        var update =
        {
            id: rows[0].Id,
            model: rows[0].Model,
            version: rows[0].Version,
            file_name: rows[0].FileName
        };
        return update;
    }
    return false;
}