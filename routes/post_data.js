var express = require('express');
var router = express.Router();

/* POST new data from sensor. */
router.post('/', function (req, res, next) {

    /*
        STRUTTURA RICHIESTA JSON
        {
            "Token": "uuid"
            "Table":
            "Val":
        }
     */

    let data = req.body;
    console.log('Request Token: ' + data.Token);

    let timestamp = dateConvert.dateToTimeStampSecond(new Date());
    console.log(timestamp);

    database.query('SELECT * FROM Station WHERE Token= \'' + data.Token + '\'', function (err, rows) {
        if (err) throw err;
        if (rows[0] === undefined) {
            res.send('unauthorized');
            console.log('unauthorized request');
        } else {
            var id = rows[0].Id;
            switch (data.Table) {
                //Inserimento temperatura
                case 'Temperature':
                    database.query('INSERT INTO  Temperature (Id, Val, Stamp) VALUES (\'' + id + '\', \'' + data.Val + '\', \''
                        + timestamp + '\')',
                        function (err, rows, fields) {
                            if (err) {
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
        }
    });
});

module.exports = router;
