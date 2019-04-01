var express = require('express');

module.exports.updateStationData = async function (data) {

    /*
        DATA OBJECT STRUCTURE
        {
            "token": "uuid",
            "temperature": "Val",
            "pressure": 10,
            "humidity": 10,
            "rain": 10,
            "wind": {
                "speed": 10,
                "direction": 0
            },
            "lighting": 10
            "air_quality": {
                "PM25": 10,
                "PM10": 10
            }
        }
     */


    let station = await database.asynchQuery('SELECT * FROM Station WHERE Token=?', [data.token]);

    station = station[0];

    //Unauthorized request
    if (station === undefined) {
        return false;
    }

    let insert_temperature = 'INSERT INTO Temperature (Id, Val, Stamp) VALUES (?, ?, ?)';
    let insert_pressure = 'INSERT INTO Pressure (Id, Val, Stamp) VALUES (?, ?, ?)';
    let insert_humidity = 'INSERT INTO Humidity (Id, Val, Stamp) VALUES (?, ?, ?)';
    let insert_rain = 'INSERT INTO Rain (Id, Val, Stamp) VALUES (?, ?, ?)';
    let insert_wind = 'INSERT INTO Wind (Id, Speed, Direction, Stamp) VALUES (?, ?, ?, ?)';
    let insert_lighting = 'INSERT INTO Lighting (Id, Distance, Stamp) VALUES (?, ?, ?)';
    let insert_air_quality = 'INSERT INTO AirQuality (Id, PM25, PM10, Stamp) VALUES (?, ?, ?, ?)';

    let station_last_update = 'UPDATE Station SET LastUpdate=? WHERE Id=?';


    let timestamp = dateConvert.dateToTimeStampSecond(new Date());

    if (data.hasOwnProperty("temperature")) {
        await database.asynchQuery(insert_temperature, [station.Id, data.temperature, timestamp]);
    }

    if (data.hasOwnProperty("pressure")) {
        await database.asynchQuery(insert_pressure, [station.Id, data.pressure, timestamp]);
    }

    if (data.hasOwnProperty("humidity")) {
        await database.asynchQuery(insert_humidity, [station.Id, data.humidity, timestamp]);
    }

    if (data.hasOwnProperty("rain")) {
        await database.asynchQuery(insert_rain, [station.Id, data.rain, timestamp]);
    }
    
    if (data.hasOwnProperty("wind")) {
        await database.asynchQuery(insert_wind, [station.Id, data.wind.speed, data.wind.direction, timestamp]);
    }

    if (data.hasOwnProperty("lighting")) {
        await database.asynchQuery(insert_lighting, [station.Id, data.lighting, timestamp]);
    }

    if (data.hasOwnProperty("air_quality")) {
        await database.asynchQuery(insert_air_quality, [station.Id, data.air_quality.PM25, data.air_quality.PM10, timestamp]);
    }

    //Update Last Update station field
    await database.asynchQuery(station_last_update, [timestamp, station.Id]);

    return true;
}

