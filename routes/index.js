var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {

    var data = [];

    var temp_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';
    var pres_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id WHERE Station.Id=\'';
    var hum_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id WHERE Station.Id=\'';
    var rain_sum_query_initial = 'SELECT SUM(Val) AS total FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id= \'';
    var rain_query_initial = 'SELECT Station.Id, Val, Stamp FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id=\'';
    var lighting_query_initial = 'SELECT Station.Id, Distance, Stamp FROM Lighting INNER JOIN Station ON Lighting.Id = Station.Id WHERE Station.Id=\'';
    var wind_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Speed, Direction, Stamp FROM Wind INNER JOIN Station ON Wind.Id = Station.Id WHERE Station.Id=\'';

    var query_end = '\' ORDER BY Stamp DESC LIMIT 1';

    var max_temp_query_initial = 'SELECT MAX(Val) AS Max FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';
    var min_temp_query_initial = 'SELECT MIN(Val) AS Min FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';


    database.query('SELECT * FROM Station', function (err, rows) {
        let station = rows;

        async.each(station, function (item, callback) {

            let name = item.StationName;
            let id = item.Id;
            let location = item.Location;
            let latitude = item.Latitude;
            let longitude = item.Longitude;
            let altitude = item.Altitude;
            let last_update = undefined;
            let temperature = 0;
            let max_temperature = 0;
            let min_temperature = 0;
            let pressure = 0;
            let humidity = 0;
            let rain_sum = 0;
            let rain_last = 0;
            let lighting = {distance: 0, stamp: 0};
            let wind = {speed: 0, direction: 0};

            let temp_query = temp_query_initial;
            let pres_query = pres_query_initial;
            let hum_query = hum_query_initial;
            let rain_sum_query = rain_sum_query_initial;
            let rain_query = rain_query_initial;
            let lighting_query = lighting_query_initial;
            let wind_query = wind_query_initial;
            let max_temp_query = max_temp_query_initial;
            let min_temp_query = min_temp_query_initial;


            rain_sum_query = rain_sum_query + id + '\' AND Stamp BETWEEN \'' + dateConvert.midnightTimeStamp() + '\' AND \'' + dateConvert.dateToTimeStamp(new Date()) + '\'';
            max_temp_query = max_temp_query + id + '\' AND Stamp BETWEEN \'' + dateConvert.midnightTimeStamp() + '\' AND \'' + dateConvert.dateToTimeStamp(new Date()) + '\'';
            min_temp_query = min_temp_query + id + '\' AND Stamp BETWEEN \'' + dateConvert.midnightTimeStamp() + '\' AND \'' + dateConvert.dateToTimeStamp(new Date()) + '\'';

            database.query(temp_query + id + query_end, function (err, rows) {
                if (rows[0] === undefined) {
                    temperature = 'N/A';
                    last_update = 'Non disponibile'
                }
                else {
                    temperature = rows[0].Val;
                    last_update = dateConvert.dateFormatter(new Date(rows[0].Stamp + 'Z'));

                    database.query(max_temp_query, function (err, rows) {
                        if (rows[0].Max !== null) {
                            max_temperature = Math.round(rows[0].Max * 10) / 10;
                            database.query(min_temp_query, function (err, rows) {
                                min_temperature = Math.round(rows[0].Min * 10) / 10;
                            });
                        } else {
                            max_temperature = 'N/A';
                            min_temperature = 'N/A';
                        }
                    });
                }

                database.query(pres_query + id + query_end, function (err, rows) {
                    if (rows[0] === undefined) {
                        pressure = 'N/A';
                    }
                    else {
                        pressure = rows[0].Val;
                    }

                    database.query(hum_query + id + query_end, function (err, rows) {
                        if (rows[0] === undefined) {
                            humidity = 'N/A';
                        }
                        else {
                            humidity = rows[0].Val;
                        }

                        database.query(rain_sum_query, function (err, rows) {
                            if (rows === undefined) {
                                rain_sum = 'N/A';
                            } else if (rows[0].total === null) {
                                rain_sum = 'N/A';
                            } else {
                                rain_sum = rows[0].total;
                            }

                            database.query(rain_query + id + query_end, function (err, rows) {
                                if (rows[0] === undefined) {
                                    rain_last = 'N/A';
                                }
                                else {
                                    rain_last = rows[0].Val;
                                }

                                database.query(lighting_query + id + query_end, function (err, rows) {
                                    if (rows[0] === undefined) {
                                        lighting = 'N/A';
                                    }
                                    else {
                                        lighting.distance = rows[0].Distance;
                                        lighting.stamp = rows[0].Stamp;
                                    }

                                    database.query(wind_query + id + query_end, function (err, rows) {
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
                                            max_temperature: max_temperature,
                                            min_temperature: min_temperature,
                                            pressure: pressure,
                                            humidity: humidity,
                                            rain_sum: rain_sum,
                                            rain_last: rain_last,
                                            lighting: lighting,
                                            wind: wind
                                        });
                                        callback(); //indica ad async che il singolo item ha finito
                                    });
                                });
                            });
                        });
                    });
                });
            });

        }, function (err) { //eseguita dopo che la funzione precedente è stata eseguita per ogni item
            if (req.device.type === "phone") {
                res.render('mobile/m_index', {
                    title: 'Meteo Server',
                    logged_user: req.user,
                    message: req.flash(),
                    data: data
                });
            } else {
                res.render('index', {
                    title: 'Meteo Server',
                    logged_user: req.user,
                    message: req.flash(),
                    data: data
                });
            }
        });
    });
});

module.exports = router;
