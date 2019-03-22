var express = require('express');
var router = express.Router();

/* GET map page. */

router.get('/', isAuthenticated, function (req, res, next) {
    var data = [];

    var temp_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';
    var pres_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id WHERE Station.Id=\'';
    var hum_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id WHERE Station.Id=\'';
    var rain_query_initial = 'SELECT SUM(Val) AS total FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id= \'';
    var lighting_query_initial = 'SELECT Station.Id, Distance, Stamp FROM Lighting INNER JOIN Station ON Lighting.Id = Station.Id WHERE Station.Id=\'';
    var wind_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Speed, Direction, Stamp FROM Wind INNER JOIN Station ON Wind.Id = Station.Id WHERE Station.Id=\'';

    var query_end = '\' ORDER BY Stamp DESC LIMIT 1';


    async function query() {
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
            let pressure = 0;
            let humidity = 0;
            let rain = 0;
            let lighting = {distance: 0, stamp: 0};
            let wind = {speed: 0, direction: 0};

            let temp_query = temp_query_initial;
            let pres_query = pres_query_initial;
            let hum_query = hum_query_initial;
            let rain_query = rain_query_initial;
            let lighting_query = lighting_query_initial;
            let wind_query = wind_query_initial;


            rain_query = rain_query + id + '\' AND Stamp BETWEEN \'' + dateConvert.hourAgoTimeStamp(2) + '\' AND \'' + dateConvert.dateToTimeStamp(new Date()) + '\'';
            lighting_query += id + '\' ORDER BY Stamp DESC LIMIT 1';

            let rows = await database.asynchQuery(temp_query + id + query_end);
            if (rows[0] === undefined) {
                temperature = 'N/A';
                last_update = 'Non disponibile'
            }
            else {
                temperature = rows[0].Val;
                last_update = dateConvert.timestampToDate(item.Stamp);
            }

            rows = await database.asynchQuery(pres_query + id + query_end);
            if (rows[0] === undefined) {
                pressure = 'N/A';
            }
            else {
                pressure = Math.round(meteoUtils.seaLevelPressure(rows[0].Val, altitude)) / 100;
            }

            rows = await database.asynchQuery(hum_query + id + query_end);
            if (rows[0] === undefined) {
                humidity = 'N/A';
            }
            else {
                humidity = rows[0].Val;
            }

            rows = await database.asynchQuery(rain_query);
            if (rows === undefined) {
                rain = 'N/A';
            } else if (rows[0].total === null) {
                rain = 'N/A';
            } else {
                rain = rows[0].total;
            }

            rows = await database.asynchQuery(lighting_query);
            if (rows[0] === undefined) {
                lighting = 'N/A';
            }
            else {
                lighting.distance = rows[0].Distance;
                lighting.stamp = dateConvert.timestampToDate(item.Stamp);
            }

            rows = await database.asynchQuery(wind_query + id + query_end);
            if (rows[0] === undefined) {
                wind = 'N/A';
            }
            else {
                wind.speed = rows[0].Speed;
                wind.direction = rows[0].Direction;
            }

            data.push({
                station: name,
                location: location,
                latitude: latitude,
                longitude: longitude,
                altitude: altitude,
                last_update: last_update,
                temperature: temperature,
                pressure: pressure,
                humidity: humidity,
                rain: rain,
                lighting: lighting,
                wind: wind
            });
        }
    }

    query().then(() => {
        if (req.device.type === "phone") {
            res.render('mobile/m_map', {
                title: 'Meteo Server',
                stations_data: JSON.stringify(data),
                logged_user: req.user,
                message: req.flash(),
            });
        } else {
            res.render('map', {
                title: 'Meteo Server',
                stations_data: JSON.stringify(data),
                logged_user: req.user,
                message: req.flash(),
            });
        }
    }).catch((err) => error.errorHandler(err, req, res));
});

module.exports = router;