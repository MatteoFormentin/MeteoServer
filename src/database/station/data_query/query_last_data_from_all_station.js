var express = require('express');


module.exports.queryLastDataFromAllStation = async function () {


    var all_station_data = [];
    let station = await database.asynchQuery('SELECT * FROM Station');

    for (let i = 0; i < station.length; i++) {
        let data = await db.querySingleStationLastData(station[i].Id);
        all_station_data.push(data);
    }

    return all_station_data;
}