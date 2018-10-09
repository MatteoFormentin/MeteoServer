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


    database.query('SELECT * FROM Station WHERE Id= \'' + data.Id + '\' AND Token= \'' + data.Token + '\'', function (err, rows) {
        if (err) throw err;
        if (rows[0] === undefined) {
            res.send('unauthorized');
            console.log('unauthorized request');
        }
        else {
            switch (data.Table) {

                //Inserimento temperatura
                case 'Temperature':
                    database.query('INSERT INTO  Temperature (Id, Val) VALUES (\'' + data.Id + '\', \'' + data.Val + '\')',
                        function (err, rows, fields) {
                            if (err) throw err;
                            console.log('INSERTED IN Temperature (Id: ' + data.Id + ', Val: ' + data.Val + ')');
                        });
                    break;

                //Inserimento pressione
                case 'Pressure':
                    database.query('INSERT INTO Pressure (Id, Val) VALUES (\'' + data.Id + '\', \'' + data.Val + '\')',
                        function (err, rows, fields) {
                            if (err) throw err;
                            console.log('INSERTED IN Pressure (Id: ' + data.Id + ', Val: ' + data.Val + ')');
                        });
                    break;

                case 'Humidity':
                    database.query('INSERT INTO Humidity (Id, Val) VALUES (\'' + data.Id + '\', \'' + data.Val + '\')',
                        function (err, rows, fields) {
                            if (err) throw err;
                            console.log('INSERTED IN Humidity (Id: ' + data.Id + ', Val: ' + data.Val + ')');
                        });
                    break;

                case 'Rain':
                    database.query('INSERT INTO Rain (Id, Val) VALUES (\'' + data.Id + '\', \'' + data.Val + '\')',
                        function (err, rows, fields) {
                            if (err) throw err;
                            console.log('INSERTED IN Rain (Id: ' + data.Id + ', Val: ' + data.Val + ')');
                        });
                    break;

                case 'Wind':
                    database.query('INSERT INTO Wind (Id, Speed, Direction) VALUES (\'' + data.Id + '\', \'' + data.Speed +
                        '\', \'' + data.Direction + '\')',
                        function (err, rows, fields) {
                            if (err) throw err;
                            console.log('INSERTED IN Wind (Id: ' + data.Id + ', Speed: ' + data.Speed + ', Direction: ' + data.Direction + ')');
                        });
                    break;

                case 'Lighting':
                    database.query('INSERT INTO Lighting (Id, Distance) VALUES (\'' + data.Id + '\', \'' + data.Distance + '\')',
                        function (err, rows, fields) {
                            if (err) throw err;
                            console.log('INSERTED IN Lighting (Id: ' + data.Id + ', Distance: ' + data.Distance + ')');
                        });
                    break;

                default:
                    console.log('Unable to Log');
            }

            res.send('ok');
        }
    });

})
;

module.exports = router;
