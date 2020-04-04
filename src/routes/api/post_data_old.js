var express = require('express');
var router = express.Router();

/* POST new data from sensor. */
router.post('/', function (req, res, next) {


    let data = req.body;

    let timestamp = moment.utc().format("Y-M-D H:mm");

    database.query('SELECT * FROM Station WHERE Token= \'' + data.Token + '\'', function (err, rows) {
        if (err) error.errorHandlerAPI(err, req, res);
        if (rows[0] === undefined) {
            res.send('unauthorized');
        } else {
            var id = rows[0].Id;
            let station_last_update = 'UPDATE Station SET LastUpdate=? WHERE Id=?';

            database.asynchQuery(station_last_update, [timestamp, id]).then(() => {
                switch (data.Table) {
                    //Inserimento temperatura
                    case 'Temperature':
                        database.query('INSERT INTO  Temperature (Id, Val, Stamp) VALUES (\'' + id + '\', \'' + data.Val + '\', \''
                            + timestamp + '\')',
                            function (err, rows, fields) {
                                if (err) {
                                    console.log("Temperature error");
                                    error.errorHandlerAPI(err, req, res);
                                    
                                } else {
                                    res.send('ok');
                                }
                            });
                        break;

                    //Inserimento pressione
                    case 'Pressure':
                        database.query('INSERT INTO Pressure (Id, Val, Stamp) VALUES (\'' + id + '\', \'' + data.Val + '\', \''
                            + timestamp + '\')',
                            function (err, rows, fields) {
                                if (err) {
                                    console.log("Pressure error");
                                    error.errorHandlerAPI(err, req, res);
                                    
                                } else {
                                    res.send('ok');
                                }
                            });
                        break;

                    case 'Humidity':
                        database.query('INSERT INTO Humidity (Id, Val, Stamp) VALUES (\'' + id + '\', \'' + data.Val + '\', \''
                            + timestamp + '\')',
                            function (err, rows, fields) {
                                if (err) {
                                    console.log("Humidity error");
                                    error.errorHandlerAPI(err, req, res);
                                    
                                } else {
                                    res.send('ok');
                                }
                            });
                        break;

                    case 'Rain':
                        database.query('INSERT INTO Rain (Id, Val, Stamp) VALUES (\'' + id + '\', \'' + data.Val + '\', \''
                            + timestamp + '\')',
                            function (err, rows, fields) {
                                if (err) {
                                    console.log("Rain error");
                                    error.errorHandlerAPI(err, req, res);
                                } else {
                                    res.send('ok');
                                }
                            });
                        break;

                    case 'Wind':
                        database.query('INSERT INTO Wind (Id, Speed, Direction, Stamp) VALUES (\'' + id + '\', \'' + data.Speed +
                            '\', \'' + data.Direction + '\', \'' + timestamp + '\')',
                            function (err, rows, fields) {
                                if (err) {
                                    console.log("Wind error");
                                    error.errorHandlerAPI(err, req, res);
                                } else {
                                    res.send('ok');
                                }
                            });
                        break;

                    case 'Lighting':
                        database.query('INSERT INTO Lighting (Id, Distance, Stamp) VALUES (\'' + id + '\', \'' + data.Distance + '\', \''
                            + timestamp + '\')',
                            function (err, rows, fields) {
                                if (err) {
                                    console.log("Lighting error");
                                    error.errorHandlerAPI(err, req, res);
                                } else {
                                    res.send('ok');
                                }
                            });
                        break;

                    default:
                        console.log('No Table');
                        res.send('no');
                }
            });
        }
    });
});

module.exports = router;
