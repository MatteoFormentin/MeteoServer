var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function (req, res, next) {

    //Station.Id=1 ORDER BY Stamp DESC LIMIT 1

    var station_data = [];

    var temp_query = 'SELECT Station.Id, StationName, Location, Val FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id WHERE Station.Id=\'';
    var pres_query = 'SELECT Station.Id, StationName, Location, Val FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id WHERE Station.Id=\'';
    var hum_query = 'SELECT * FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id';
    var rain_query = 'SELECT * FROM Rain INNER JOIN Station ON Rain.Id = Station.Id';

    var query_end = '\' ORDER BY Stamp DESC LIMIT 1';

    database.query('SELECT * FROM Station', function (err, rows) {
        for (station of rows) {

            let single_station_data = {station_name: '0', temperature: '0', pressure: '0', humidity: '0', rain: '0'};
            single_station_data.station_name = station.StationName;

            //console.log(station);

            database.query(temp_query + station.Id + query_end, function (err, rows) {
                if (rows[0] === undefined) {
                    single_station_data.temperature = 'N/A';
                }
                else {
                    single_station_data.temperature = rows[0].Val;
                }

                database.query(temp_query + station.Id + query_end, function (err, rows) {

                    if (rows[0] === undefined) {
                        single_station_data.pressure = 'N/A';
                    }
                    else {
                        single_station_data.pressure = rows[0].Val;
                    }

                    station_data.push(single_station_data);
                    console.log('qui');
                });
            });
        }
        console.log('Val: ');
        console.log(station_data);
        res.render('index', {title: 'Meteo Server', station_data: station_data});

    });


});
*/
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
            res.render('index', {title: 'Meteo Server', temperatura: temp, pressione: pres});
        });
    });

});

module.exports = router;
