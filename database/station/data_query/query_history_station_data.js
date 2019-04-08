var express = require('express');

module.exports.queryHistoryStationData = async function (station_id, timestamp_start, timestamp_end) {
    var station_query = 'SELECT * FROM Station WHERE Id=?';
    var temp_query = 'SELECT * FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ? ORDER BY Stamp ASC';
    var pres_query = 'SELECT * FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ? ORDER BY Stamp ASC';
    var hum_query = 'SELECT * FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ? ORDER BY Stamp ASC';
    var rain_query = 'SELECT * FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ? ORDER BY Stamp ASC';
    var wind_query = 'SELECT * FROM Wind INNER JOIN Station ON Wind.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ? ORDER BY Stamp ASC';
    var lighting_query = 'SELECT * FROM Lighting INNER JOIN Station ON Lighting.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ? ORDER BY Stamp ASC';
    var air_quality_query = 'SELECT * FROM AirQuality INNER JOIN Station ON AirQuality.Id = Station.Id WHERE Station.Id=? AND Stamp BETWEEN ? AND ? ORDER BY Stamp ASC';

    //DATA OBJECT
    // Data that belong to the same table are placed in differnt array. Search a pair using the same index.

    var data = {
        name: "",
        id:0,
        location: 0,
        latitude: 0,
        longitude: 0,
        altitude: 0,
        last_update: 0,

        temperature: { val: [], stamp: [] },
        pressure: { val: [], stamp: [] },
        humidity: { val: [], stamp: [] },
        rain: { val: [], stamp: [], total_rainfall: 0 },
        lighting: { distance: [], stamp: [] },
        wind: { speed: [], direction: [], cardinal_direction: [], stamp: [] },
        air_quality: {
            PM25: [],
            PM10: [],
            stamp: []
        }
    };


    if (!timestamp_start) {
        timestamp_start = dateConvert.midnightTimeStamp(false);
    }

    if (!timestamp_end) {
        timestamp_end = dateConvert.dateToTimeStamp(new Date(), false);
    }

    //Cerco la stazione attualmente selezionata
    rows = await database.asynchQuery(station_query, [station_id]);
    let selected_station = rows[0];

    if (selected_station == undefined) return undefined; //station id not existing

    data.name = selected_station.StationName;
    data.id = selected_station.Id;
    data.location = selected_station.Location;
    data.latitude = selected_station.Latitude;
    data.longitude = selected_station.Longitude;
    data.altitude = selected_station.Altitude;
    data.last_update = selected_station.LastUpdate;

    //TEMPERATURE
    rows = await database.asynchQuery(temp_query, [
        station_id,
        timestamp_start,
        timestamp_end
    ]);
    if (rows[0] !== undefined) {
        for (item of rows) {
            data.temperature.val.push(item.Val);
            data.temperature.stamp.push(dateConvert.timestampToDate(item.Stamp));
        }
    } else {
        data.temperature = "N/A"
    }

    //PRESSURE
    rows = await database.asynchQuery(pres_query, [
        station_id,
        timestamp_start,
        timestamp_end
    ]);
    if (rows[0] !== undefined) {
        for (item of rows) {
            data.pressure.val.push(meteoUtils.seaLevelPressure(item.Val, selected_station.Altitude));
            data.pressure.stamp.push(dateConvert.timestampToDate(item.Stamp));
        }
    } else {
        data.pressure = "N/A"
    }

    //HUMIDITY
    rows = await database.asynchQuery(hum_query, [
        station_id,
        timestamp_start,
        timestamp_end
    ]);
    if (rows[0] !== undefined) {
        for (item of rows) {
            data.humidity.val.push(item.Val);
            data.humidity.stamp.push(dateConvert.timestampToDate(item.Stamp));
        }
    } else {
        data.humidity = "N/A"
    }

    //RAIN
    rows = await database.asynchQuery(rain_query, [
        station_id,
        timestamp_start,
        timestamp_end
    ]);
    if (rows[0] !== undefined) {
        for (item of rows) {
            data.rain.val.push(item.Val);
            data.rain.stamp.push(dateConvert.timestampToDate(item.Stamp));
        }

        for (item of rows) {
            data.rain.total_rainfall += item.Val;
        }
    } else {
        data.rain = "N/A"
    }

    //LIGHTING
    rows = await database.asynchQuery(lighting_query, [
        station_id,
        timestamp_start,
        timestamp_end
    ]);
    if (rows[0] !== undefined) {
        for (item of rows) {
            data.lighting.distance.push(item.Distance);
            data.lighting.stamp.push(dateConvert.timestampToDate(item.Stamp));
        }
    } else {
        data.lighting = "N/A"
    }

    //WIND
    rows = await database.asynchQuery(wind_query, [
        station_id,
        timestamp_start,
        timestamp_end
    ]);
    if (rows[0] !== undefined) {
        for (item of rows) {
            data.wind.speed.push(item.Speed);
            data.wind.direction.push(item.Direction);
            data.wind.cardinal_direction.push(meteoUtils.degToCardinal(item.Direction));
            data.wind.stamp.push(dateConvert.timestampToDate(item.Stamp));
        }
    } else {
        data.wind = "N/A"
    }

    //AIR QUALITY
    rows = await database.asynchQuery(air_quality_query, [
        station_id,
        timestamp_start,
        timestamp_end
    ]);
    if (rows[0] !== undefined) {
        for (item of rows) {
            data.air_quality.PM25.push(item.PM25);
            data.air_quality.PM10.push(item.PM10);
            data.air_quality.stamp.push(dateConvert.timestampToDate(item.Stamp));
        }
    } else {
        data.air_quality = "N/A"
    }

    return data;
}