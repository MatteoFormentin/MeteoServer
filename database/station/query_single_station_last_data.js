var express = require('express');

module.exports.querySingleStationLastData = async function (station_id) {

    var temp_query = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=?  AND Stamp BETWEEN  ?  AND ? ORDER BY Stamp DESC';

    var max_temp_query = 'SELECT MAX(Val) AS Max FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=?  AND Stamp BETWEEN  ?  AND ?';
    var min_temp_query = 'SELECT MIN(Val) AS Min FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=?  AND Stamp BETWEEN  ?  AND ?';

    var pres_query = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ?';

    var hum_query = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id WHERE Station.Id=? ORDER BY Stamp DESC LIMIT 1';

    var rain_query = 'SELECT Station.Id, Val, Stamp FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id=? ORDER BY Stamp DESC LIMIT 1';
    var rain_sum_query = 'SELECT SUM(Val) AS total FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ?';
    var rain_sum_query_hour = 'SELECT SUM(Val) AS total FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ?';

    var lighting_query = 'SELECT Station.Id, Distance, Stamp FROM Lighting INNER JOIN Station ON Lighting.Id = Station.Id WHERE Station.Id=? ORDER BY Stamp DESC LIMIT 1';
    var wind_query = 'SELECT Station.Id, StationName, Location, Altitude, Speed, Direction, Stamp FROM Wind INNER JOIN Station ON Wind.Id = Station.Id WHERE Station.Id=? ORDER BY Stamp DESC LIMIT 1';

    let station = await database.asynchQuery('SELECT * FROM Station WHERE Id = ?', [
        station_id
    ]);
    station = station[0];

    console.log(station);

    if (station == undefined) return undefined; //station id not existing

    /*------RETURN OBJECT INIT------*/
    let name = station.StationName;
    let id = station.Id;
    let location = station.Location;
    let latitude = station.Latitude;
    let longitude = station.Longitude;
    let altitude = station.Altitude;
    let last_update = undefined;
    let temperature = 0;
    let temperature_diff = 0;
    let max_temperature = 0;
    let min_temperature = 0;
    let pressure = 0;
    let sea_level_pressure = 0;
    let pressure_diff = 0;
    let humidity = 0;
    let dew_point = 0;
    let humidex = 0;
    let rain_sum = 0;
    let rain_sum_hour = 0;
    let rain_last = 0;
    let lighting = {
        distance: 0,
        stamp: 0
    };
    let wind = {
        speed: 0,
        direction: 0,
        cardinal_direction: 0
    };


    //Temperature - related
    let rows = await database.asynchQuery(temp_query, [
        station_id,
        dateConvert.hourAgoTimeStamp(1),
        dateConvert.dateToTimeStamp(new Date(), true)
    ]);
    if (rows[0] === undefined) {
        temperature = 'N/A';
    } else {
        temperature = rows[0].Val;
        temperature_diff = Math.round((rows[rows.length - 1].Val - rows[0].Val) * 10) / 10;
        rows = await database.asynchQuery(max_temp_query, [
            station_id,
            dateConvert.midnightTimeStamp(),
            dateConvert.dateToTimeStamp(new Date(), true)
        ]);
        if (rows[0].Max !== null) {
            max_temperature = Math.round(rows[0].Max * 10) / 10;
            rows = await database.asynchQuery(min_temp_query, [
                station_id,
                dateConvert.midnightTimeStamp(),
                dateConvert.dateToTimeStamp(new Date(), true)
            ]);
            min_temperature = Math.round(rows[0].Min * 10) / 10;
        } else {
            max_temperature = 'N/A';
            min_temperature = 'N/A';
        }
    }

    //Pressure - related
    rows = await database.asynchQuery(pres_query, [
        station_id,
        dateConvert.hourAgoTimeStamp(3),
        dateConvert.dateToTimeStamp(new Date(), true)
    ]);
    if (rows[0] === undefined) {
        pressure = 'N/A';
        sea_level_pressure = 'N/A';
    }
    else {
        pressure = Math.round(rows[0].Val) / 100;
        pressure_diff = (rows[rows.length - 1].Val - rows[0].Val) / 100;
        sea_level_pressure = meteoUtils.seaLevelPressure(rows[0].Val, altitude);
    }

    //Humidity - related
    rows = await database.asynchQuery(hum_query, [
        station_id,
    ]);
    if (rows[0] === undefined) {
        humidity = 'N/A';
        last_update = 'Non disponibile'
    }
    else {
        humidity = rows[0].Val;
        last_update = rows[0].Stamp;
    }

    //Dew Point -- Humidex
    if (temperature !== 'N/A' && humidity !== 'N/A') {
        dew_point = meteoUtils.dewPoint(temperature, humidity);
        humidex = meteoUtils.humidex(temperature, humidity);
    } else {
        dew_point = 'N/A';
        humidex = 'N/A';
    }

    //Rain - related
    rows = await database.asynchQuery(rain_query, [
        station_id,
    ]);
    if (rows[0] === undefined) {
        rain_last = 'N/A';
    }
    else {
        rain_last = Math.round(rows[0].total * 100) / 100;
    }

    rows = await database.asynchQuery(rain_sum_query, [
        station_id,
        dateConvert.midnightTimeStamp(),
        dateConvert.dateToTimeStamp(new Date(), true)
    ]);
    if (rows === undefined) {
        rain_sum = 'N/A';
    } else if (rows[0].total === null) {
        rain_sum = 'N/A';
    } else {

        rain_sum = Math.round(rows[0].total * 100) / 100;
    }

    rows = await database.asynchQuery(rain_sum_query_hour, [
        station_id,
        dateConvert.hourAgoTimeStamp(1),
        dateConvert.dateToTimeStamp(new Date(), true)
    ]);
    if (rows === undefined) {
        rain_sum_hour = 'N/A';
    } else if (rows[0].total === null) {
        rain_sum_hour = 'N/A';
    } else {
        rain_sum_hour = Math.round(rows[0].total * 100) / 100;
    }

    //Wind - related
    rows = await database.asynchQuery(wind_query, [
        station_id,
    ]);
    if (rows[0] === undefined) {
        wind = 'N/A';
    }
    else {
        wind.speed = rows[0].Speed;
        wind.direction = rows[0].Direction;
        wind.cardinal_direction = meteoUtils.degToCardinal(wind.direction);
    }

    //Windchill
    if (temperature !== 'N/A' && wind !== 'N/A') {
        windchill = meteoUtils.windchill(temperature, wind.speed)
    } else {
        windchill = 'N/A';
    }

    //Lighting - related
    rows = await database.asynchQuery(lighting_query, [
        station_id,
    ]);
    if (rows[0] === undefined) {
        lighting = 'N/A';
    }
    else {
        lighting.distance = rows[0].Distance;
        lighting.stamp = dateConvert.timestampToDate(rows[0].Stamp);
    }


    if (sea_level_pressure !== 'N/A') {
        let trend = 0;
        if (pressure_diff > 1) trend = 1;
        if (pressure_diff < -1) trend = 2;

        if (wind !== 'N/A' && wind.speed > 0) {
            forecast = meteoUtils.forecast(sea_level_pressure, wind.cardinal_direction, trend);
        } else {
            forecast = meteoUtils.forecast(sea_level_pressure, 1, trend);
        }
    } else {
        forecast = 'N/A';
    }

    return {
        station: name,
        location: location,
        latitude: latitude,
        longitude: longitude,
        altitude: altitude,
        last_update: last_update,
        temperature: temperature,
        temperature_diff: temperature_diff,
        max_temperature: max_temperature,
        min_temperature: min_temperature,
        pressure: pressure,
        sea_level_pressure: sea_level_pressure,
        pressure_diff: pressure_diff,
        humidity: humidity,
        dew_point: dew_point,
        humidex: humidex,
        rain_sum: rain_sum,
        rain_sum_hour: rain_sum_hour,
        rain_last: rain_last,
        lighting: lighting,
        wind: wind,
        windchill: windchill,
        forecast: forecast
    };


}