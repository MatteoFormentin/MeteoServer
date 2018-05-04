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

/*
SELECT * FROM((SELECT Station.id, Temperature.Val AS Temperature FROM Station
INNER JOIN Temperature ON Temperature.Id = Station.Id ORDER BY Temperature.Stamp LIMIT 1)
UNION
(SELECT Station.Id, Pressure.Val AS Pressure FROM Station
INNER JOIN Pressure ON Pressure.Id = Station.Id  ORDER BY Pressure.Stamp LIMIT 1)
UNION
(SELECT Station.Id, Humidity.Val AS Humidity FROM Station
INNER JOIN Humidity ON Humidity.Id = Station.Id  ORDER BY Humidity.Stamp LIMIT 1)
UNION
(SELECT Station.Id, Rain.Val AS Rain FROM Station
INNER JOIN Rain ON Rain.Id = Station.Id  ORDER BY Rain.Stamp LIMIT 1)) AS D ORDER BY D.id

router.get('/', function (req, res, next) {

    var temp = 0;
    var pres = 0;


    //Le query sono concorrenti! farle nested con render alla fine
    database.query('SELECT Val, MAX(Stamp) FROM Temperature GROUP BY Val', function (err, rows) {
        if (err) throw err;
        if (rows[0] === undefined) {
            temp = 'N/A';
        }
        else {
            temp = rows[0].Val;
        }
        database.query('SELECT Val, MAX(Stamp) FROM Pressure GROUP BY Val', function (err, rows) {
            if (err) throw err;
            if (rows[0] === undefined) {
                pres = 'N/A';
            }
            else {
                pres = rows[0].Val;
            }
            database.query('SELECT Val, MAX(Stamp) FROM Humidity GROUP BY Val', function (err, rows) {
                if (err) throw err;
                if (rows[0] === undefined) {
                    hum = 'N/A';
                }
                else {
                    hum = rows[0].Val;
                }
                res.render('index', {title: 'Meteo Server', temperatura: temp, pressione: pres, humidity: hum});
            });
        });
    });

});
*/
module.exports = router;
