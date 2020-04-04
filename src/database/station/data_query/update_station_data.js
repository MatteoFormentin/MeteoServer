var express = require('express');


module.exports.updateStationData = async function (data) {

    /*
        DATA OBJECT STRUCTURE
        {
            "token": "uuid",
            "model": "esp_station",
            "firmware_version": "1.0.1",
            "temperature": 10,
            "pressure": 10,
            "humidity": 10,
            "rain": 10,
            "wind": {
                "speed": 10,
                "direction": 0
            },
            "lighting": 10,
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
    let station_ota = 'UPDATE Station SET FirmwareVersion=?, Model=? WHERE Id=?';


    let timestamp = moment.utc().format("Y-M-D H:mm");

    if (data.hasOwnProperty("temperature")) {
        try {
            await database.asynchQuery(insert_temperature, [station.Id, data.temperature, timestamp]);
        } catch (err) {
            logger.error("DATABASE: Error inserting new Temperature");
            throw err;
        }
    }

    if (data.hasOwnProperty("pressure")) {
        try {
            await database.asynchQuery(insert_pressure, [station.Id, data.pressure, timestamp]);
        } catch (err) {
            logger.error("DATABASE: Error inserting new Pressure");
            throw err;
        }
    }

    if (data.hasOwnProperty("humidity")) {
        try {
            await database.asynchQuery(insert_humidity, [station.Id, data.humidity, timestamp]);
        } catch (err) {
            logger.error("DATABASE: Error inserting new Humidity");
            throw err;
        }
    }

    if (data.hasOwnProperty("rain")) {
        try {
            await database.asynchQuery(insert_rain, [station.Id, data.rain, timestamp]);
        } catch (err) {
            logger.error("DATABASE: Error inserting new Rain");
            throw err;
        }
    }

    if (data.hasOwnProperty("wind")) {
        try {
            await database.asynchQuery(insert_wind, [station.Id, data.wind.speed, data.wind.direction, timestamp]);
        } catch (err) {
            logger.error("DATABASE: Error inserting new Wind");
            throw err;
        }
    }

    if (data.hasOwnProperty("lighting")) {
        try {
            await database.asynchQuery(insert_lighting, [station.Id, data.lighting, timestamp]);
        } catch (err) {
            logger.error("DATABASE: Error inserting new AirQuality");
            throw err;
        }
    }

    if (data.hasOwnProperty("air_quality")) {
        try {
            await database.asynchQuery(insert_air_quality, [station.Id, data.air_quality.PM25, data.air_quality.PM10, timestamp]);
        } catch (err) {
            logger.error("DATABASE: Error inserting new AirQuality");
            throw err;
        }
    }

    //Update Last Update station field
    try {
        await database.asynchQuery(station_last_update, [timestamp, station.Id]);
    } catch (err) {
        logger.error("DATABASE: Error updating LastUpdate");
        throw err;
    }

    //Upate model and firmware version
    if (data.hasOwnProperty("model") && data.hasOwnProperty("firmware_version")) {
        try {
            await database.asynchQuery(station_ota, [
                data.firmware_version,
                data.model,
                station.Id
            ]);
        } catch (err) {
            logger.error("DATABASE: Error updating model and firmware version");
            throw err;
        }
    }

    return true;
}

