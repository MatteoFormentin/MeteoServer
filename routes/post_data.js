var express = require('express');
var router = express.Router();

/* POST new data from sensor. */
router.post('/', function (req, res, next) {

    /*
        STRUTTURA RICHIESTA JSON
        {
            "Id":
            "Token": 49294b3d-a08a-4e35-a422-037b0fad735f
            "Table":
            "Val":
        }
     */

    let data = req.body;
    console.log('Request from Id: ' + data.Id + ' Token: ' + data.Token);
    console.log(data);

    database.query('SELECT * FROM Station WHERE Id= \'' + data.Id + '\' AND Token= \'' + data.Token + '\'', function (err, rows) {
        if (err) throw err;
        if (rows[0] === undefined) {
            res.send('unauthorized');
            console.log('unauthorized request');
        } else {
            switch (data.Table) {

                //Inserimento temperatura
                case 'Temperature':
                    database.query('INSERT INTO  Temperature (Id, Val) VALUES (\'' + data.Id + '\', \'' + data.Val + '\')',
                        function (err, rows, fields) {
                            if (err) {
                                console.log('error');
                                res.send('no');
                            } else {
                                res.send('ok');
                            }
                        });
                    break;

                //Inserimento pressione
                case 'Pressure':
                    database.query('INSERT INTO Pressure (Id, Val) VALUES (\'' + data.Id + '\', \'' + data.Val + '\')',
                        function (err, rows, fields) {
                            if (err) {
                                console.log('error');
                                res.send('no');
                            } else {
                                res.send('ok');
                            }
                        });
                    break;

                case 'Humidity':
                    database.query('INSERT INTO Humidity (Id, Val) VALUES (\'' + data.Id + '\', \'' + data.Val + '\')',
                        function (err, rows, fields) {
                            if (err) {
                                console.log('error');
                                res.send('no');
                            } else {
                                res.send('ok');
                            }
                        });
                    break;

                case 'Rain':
                    database.query('INSERT INTO Rain (Id, Val) VALUES (\'' + data.Id + '\', \'' + data.Val + '\')',
                        function (err, rows, fields) {
                            if (err) {
                                console.log('error');
                                res.send('no');
                            } else {
                                res.send('ok');
                            }
                        });
                    break;

                case 'Wind':
                    database.query('INSERT INTO Wind (Id, Speed, Direction) VALUES (\'' + data.Id + '\', \'' + data.Speed +
                        '\', \'' + data.Direction + '\')',
                        function (err, rows, fields) {
                            if (err) {
                                console.log('error');
                                res.send('no');
                            } else {
                                res.send('ok');
                            }
                        });
                    break;

                case 'Lighting':
                    database.query('INSERT INTO Lighting (Id, Distance) VALUES (\'' + data.Id + '\', \'' + data.Distance + '\')',
                        function (err, rows, fields) {
                            if (err) {
                                console.log('error');
                                res.send('no');
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
