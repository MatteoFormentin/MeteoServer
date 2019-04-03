var express = require('express');

module.exports.queryUpdateAvailable = async function (model) {
    var query = 'SELECT Model, Version, Path, Stamp FROM User WHERE Model=?';

    let rows = database.asynchQuery(query, [
        model
    ]);

    if (rows) {
        var station_update_available =
        {
            id: rows[0].Id,
            model: rows[0].Model,
            version: rows[0].Version,
            path: rows[0].Path
        };
        return station_update_available;
    }
    return false;
}