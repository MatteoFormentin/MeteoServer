var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {

    var data = [];

    var temp_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';
    var pres_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id WHERE Station.Id=\'';
    var hum_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Val, Stamp FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id WHERE Station.Id=\'';
    var rain_query_initial = 'SELECT SUM(Val) AS total FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id= ';
    var lighting_query_initial = 'SELECT Station.Id, Distance, Stamp FROM Lighting INNER JOIN Station ON Lighting.Id = Station.Id WHERE Station.Id=\'';
    var wind_query_initial = 'SELECT Station.Id, StationName, Location, Altitude, Speed, Direction, Stamp FROM Wind INNER JOIN Station ON Wind.Id = Station.Id WHERE Station.Id=\'';

    var query_end = '\' ORDER BY Stamp DESC LIMIT 1';

    database.query('SELECT * FROM Station', function (err, rows) {
        let station = rows;

        async.each(station, function (item, callback) {

            let name = item.StationName;
            let id = item.Id;
            let location = item.Location;
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


            rain_query = rain_query + id + ' AND Stamp BETWEEN \'' + dateConvert.hourAgoTimeStamp(2) + '\' AND \'' + dateConvert.dateToTimeStamp(new Date()) + '\'';
            lighting_query += id + '\' ORDER BY Stamp DESC LIMIT 1';

            database.query(temp_query + id + query_end, function (err, rows) {
                if (rows[0] === undefined) {
                    temperature = 'N/A';
                    last_update = 'Non disponibile'
                }
                else {
                    temperature = rows[0].Val;
                    last_update = rows[0].Stamp;
                }
                console.log(rows[0].Stamp);
                console.log(last_update);


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

                        database.query(rain_query, function (err, rows) {
                            console.log(rows);
                            if (rows === undefined) {
                                rain = 'N/A';
                            }
                            else {
                                rain = rows[0].total;
                            }

                            database.query(lighting_query, function (err, rows) {
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
                                        title: 'Meteo Server',
                                        logged_user: req.user,
                                        station: name,
                                        location: location,
                                        altitude: altitude,
                                        last_update: last_update,
                                        temperature: temperature,
                                        pressure: pressure,
                                        humidity: humidity,
                                        rain: rain,
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
        }, function (err) { //eseguita dopo che la funzione precedente è stata eseguita per ogni item
            res.render('index', {
                title: 'Meteo Server',
                logged_user: req.user,
                message: req.flash(),
                data: data
            });
        });
    });
});

module.exports = router;
