var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var data = {station: '0', temperature: '0', pressure: '0', humidity: '0', rain: '0'}

    var selected_id = 0; //0-All, 1,2,.. Stazioni
    var selected_station = 0;

    var station_query = 'SELECT * FROM Station';

    var temp_query = 'SELECT * FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id';
    var pres_query = 'SELECT * FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id';
    var hum_query = 'SELECT * FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id';
    var rain_query = 'SELECT * FROM Rain INNER JOIN Station ON Rain.Id = Station.Id';

    if (!(req.query.station === undefined) && !(req.query.station === '0')) {
        selected_id = req.query.station;
        temp_query += ' WHERE Station.Id= \'' + selected_id + '\'';
        pres_query += ' WHERE Station.Id= \'' + selected_id + '\'';
        hum_query += ' WHERE Station.Id= \'' + selected_id + '\'';
        rain_query += ' WHERE Station.Id= \'' + selected_id + '\'';
    }


    if ((!req.query.date_start === undefined || !req.query.date_end === undefined)) {
        if (req.query.date_start === undefined) {
            temp_query += ' WHERE Stamp BETWEEN \'2000-01-01T00:00\'';
            pres_query += ' WHERE Stamp BETWEEN \'2000-01-01T00:00\'';
            hum_query += ' WHERE Stamp BETWEEN \'2000-01-01T00:00\'';
            rain_query += ' WHERE Stamp BETWEEN \'2000-01-01T00:00\'';
        }
        else {
            temp_query += ' WHERE Stamp BETWEEN \'' + req.query.date_start + '\'';
            pres_query += ' WHERE Stamp BETWEEN \'' + req.query.date_start + '\'';
            hum_query += ' WHERE Stamp BETWEEN \'' + req.query.date_start + '\'';
            rain_query += ' WHERE Stamp BETWEEN \'' + req.query.date_start + '\'';
        }

        if (req.query.date_end === undefined) {
            temp_query += ' AND \'2100-01-01T00:00\'';
            pres_query += ' AND \'2100-01-01T00:00\'';
            hum_query += ' AND \'2100-01-01T00:00\'';
            rain_query += ' AND \'2100-01-01T00:00\'';
        }
        else {
            temp_query += ' AND \'' + req.query.date_end + '\'';
            pres_query += ' AND \'' + req.query.date_end + '\'';
            hum_query += ' AND \'' + req.query.date_end + '\'';
            rain_query += ' AND \'' + req.query.date_end + '\'';
        }
        }

        console.log(temp_query);
        console.log(pres_query);

    database.query(station_query, function (err, rows) {
            if (err) throw err;
            console.log(rows);
        data.station = rows;

        if (selected_id !== 0) {
            database.query('SELECT * FROM Station WHERE Id= \'' + selected_id + '\'', function (err, rows) {
                selected_station = rows[0];
            });
        }
        else {
            selected_station = {StationName: "Tutte", Location: "Tutte"};
        }
        database.query(temp_query, function (err, rows) {
            if (err) throw err;
            console.log(rows);
            data.temperature = rows;
            database.query(pres_query, function (err, rows) {
                if (err) throw err;
                console.log(rows);
                data.pressure = rows;
                database.query(hum_query, function (err, rows) {
                    if (err) throw err;
                    console.log(rows);
                    data.humidity = rows;
                    database.query(rain_query, function (err, rows) {
                        if (err) throw err;
                        console.log(rows);
                        data.rain = rows;
                        res.render('history', {
                            title: 'Meteo Server',
                            selected_station: selected_station,
                            data: data
                        });
                    });
                });
            });
        });
    });
    }
);

module.exports = router;
