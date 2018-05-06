var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {

    var data = [];

    var temp_query = 'SELECT Station.Id, StationName, Location, Val FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';
    var pres_query = 'SELECT Station.Id, StationName, Location, Val FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id WHERE Station.Id=\'';
    var hum_query = 'SELECT Station.Id, StationName, Location, Val FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id WHERE Station.Id=\'';
    var rain_query = 'SELECT Station.Id, StationName, Location, Val FROM Rain INNER JOIN Station ON Rain.Id = Station.Id WHERE Station.Id=\'';

    var query_end = '\' ORDER BY Stamp DESC LIMIT 1';

    database.query('SELECT * FROM Station', function (err, rows) {
        let station = rows;

        async.each(station, function (item, callback) {
            console.log(item.StationName);

            var name = item.StationName;
            var id = item.Id;
            var location = item.Location;
            var temperature = 0;
            var pressure = 0;
            var humidity = 0;
            var rain = 0;

            database.query(temp_query + id + query_end, function (err, rows) {
                if (rows[0] === undefined) {
                    temperature = 'N/A';
                }
                else {
                    temperature = rows[0].Val;
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
                        database.query(rain_query + id + query_end, function (err, rows) {
                            if (rows[0] === undefined) {
                                rain = 'N/A';
                            }
                            else {
                                rain = rows[0].Val;
                            }
                            data.push({
                                station: name,
                                location: location,
                                temperature: temperature,
                                pressure: pressure,
                                humidity: humidity,
                                rain: rain
                            });
                            callback(); //indica ad async che il singolo item ha finito
                        });
                    });

                });
            });
        }, function (err) { //eseguita dopo che la funzione precedente è stata eseguita per ogni item
            console.log(data);
            res.render('index', {title: 'Meteo Server', data: data});
        });

    });


});

module.exports = router;
