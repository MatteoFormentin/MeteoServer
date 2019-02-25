var express = require('express');

module.exports.queryLastDataFromAllStation = async function () {

    var all_station_data = [];

    var temp_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';
    var pres_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id WHERE Station.Id=\'';
    var hum_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id WHERE Station.Id=\'';
    var rain_sum_query_initial = 'SELECT SUM(Val) AS total FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id= \'';
    var rain_sum_query_hour_initial = 'SELECT SUM(Val) AS total FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id= \'';
    var rain_query_initial = 'SELECT Station.Id, Val, Stamp FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id=\'';
    var lighting_query_initial = 'SELECT Station.Id, Distance, Stamp FROM Lighting INNER JOIN Station ON Lighting.Id = Station.Id WHERE Station.Id=\'';
    var wind_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Speed, Direction, Stamp FROM Wind INNER JOIN Station ON Wind.Id = Station.Id WHERE Station.Id=\'';

    var query_end = '\' ORDER BY Stamp DESC LIMIT 1';

    var max_temp_query_initial = 'SELECT MAX(Val) AS Max FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';
    var min_temp_query_initial = 'SELECT MIN(Val) AS Min FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';

    let station = await database.asynchQuery('SELECT * FROM Station');

    for (let i = 0; i < station.length; i++) {
        let item = station[i];
        let name = item.StationName;
        let id = item.Id;
        let location = item.Location;
        let latitude = item.Latitude;
        let longitude = item.Longitude;
        let altitude = item.Altitude;
        let last_update = undefined;
        let temperature = 0;
        let temperature_diff = 0;
        let max_temperature = 0;
        let min_temperature = 0;
        let pressure = 0;
        let pressure_diff = 0;
        let humidity = 0;
        let rain_sum = 0;
        let rain_sum_hour = 0;
        let rain_last = 0;
        let lighting = { distance: 0, stamp: 0 };
        let wind = { speed: 0, direction: 0 };

        let temp_query = temp_query_initial;
        let pres_query = pres_query_initial;
        let hum_query = hum_query_initial;
        let rain_query = rain_query_initial;
        let rain_sum_query = rain_sum_query_initial;
        let rain_sum_query_hour = rain_sum_query_hour_initial;
        let lighting_query = lighting_query_initial;
        let wind_query = wind_query_initial;
        let max_temp_query = max_temp_query_initial;
        let min_temp_query = min_temp_query_initial;


        rain_sum_query = rain_sum_query + id + '\' AND Stamp BETWEEN \'' + dateConvert.midnightTimeStamp() + '\' AND \'' + dateConvert.dateToTimeStamp(new Date(), true) + '\'';
        rain_sum_query_hour = rain_sum_query_hour + id + '\' AND Stamp BETWEEN \'' + dateConvert.hourAgoTimeStamp(1) + '\' AND \'' + dateConvert.dateToTimeStamp(new Date(), true) + '\'';
        temp_query = temp_query + id + '\' AND Stamp BETWEEN \'' + dateConvert.hourAgoTimeStamp(1) + '\' AND \'' + dateConvert.dateToTimeStamp(new Date(), true) + '\' ORDER BY Stamp DESC';
        max_temp_query = max_temp_query + id + '\' AND Stamp BETWEEN \'' + dateConvert.midnightTimeStamp() + '\' AND \'' + dateConvert.dateToTimeStamp(new Date(), true) + '\'';
        min_temp_query = min_temp_query + id + '\' AND Stamp BETWEEN \'' + dateConvert.midnightTimeStamp() + '\' AND \'' + dateConvert.dateToTimeStamp(new Date(), true) + '\'';

        pres_query = pres_query + id + '\' AND Stamp BETWEEN \'' + dateConvert.hourAgoTimeStamp(3) + '\' AND \'' + dateConvert.dateToTimeStamp(new Date(), true) + '\'';


        //Temperature - related
        let rows = await database.asynchQuery(temp_query);
        if (rows[0] === undefined) {
            temperature = 'N/A';
        } else {
            temperature = rows[0].Val;
            temperature_diff = rows[rows.length - 1].Val - rows[0].Val;
            rows = await database.asynchQuery(max_temp_query);
            if (rows[0].Max !== null) {
                max_temperature = Math.round(rows[0].Max * 10) / 10;
                rows = await database.asynchQuery(min_temp_query);
                min_temperature = Math.round(rows[0].Min * 10) / 10;
            } else {
                max_temperature = 'N/A';
                min_temperature = 'N/A';
            }
        }

        //Pressure - related
        rows = await database.asynchQuery(pres_query);
        if (rows[0] === undefined) {
            pressure = 'N/A';
        }
        else {
            pressure = rows[0].Val;
            pressure_diff = (rows[rows.length - 1].Val - rows[0].Val) / 100;
        }

        //Humidity - related
        rows = await database.asynchQuery(hum_query + id + query_end);
        if (rows[0] === undefined) {
            humidity = 'N/A';
            last_update = 'Non disponibile'
        }
        else {
            humidity = rows[0].Val;
            last_update = rows[0].Stamp;
        }

        //Rain - related
        rows = await database.asynchQuery(rain_sum_query);
        if (rows === undefined) {
            rain_sum = 'N/A';
        } else if (rows[0].total === null) {
            rain_sum = 'N/A';
        } else {
            rain_sum = rows[0].total;
        }

        rows = await database.asynchQuery(rain_sum_query_hour);
        if (rows === undefined) {
            rain_sum_hour = 'N/A';
        } else if (rows[0].total === null) {
            rain_sum_hour = 'N/A';
        } else {
            rain_sum_hour = rows[0].total;
        }

        rows = await database.asynchQuery(rain_query + id + query_end);
        if (rows[0] === undefined) {
            rain_last = 'N/A';
        }
        else {
            rain_last = rows[0].Val;
        }

        //Wind - related
        rows = await database.asynchQuery(wind_query + id + query_end);
        if (rows[0] === undefined) {
            wind = 'N/A';
        }
        else {
            wind.speed = rows[0].Speed;
            wind.direction = rows[0].Direction;
        }

        //Lighting - related
        rows = await database.asynchQuery(lighting_query + id + query_end);
        if (rows[0] === undefined) {
            lighting = 'N/A';
        }
        else {
            lighting.distance = rows[0].Distance;
            lighting.stamp = dateConvert.timestampToDate(rows[0].Stamp);
        }

        all_station_data.push({
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
            pressure_diff: pressure_diff,
            humidity: humidity,
            rain_sum: rain_sum,
            rain_sum_hour: rain_sum_hour,
            rain_last: rain_last,
            lighting: lighting,
            wind: wind
        });
    }
    return all_station_data;
}