var express = require('express');
var router = express.Router();

/* POST new data from sensor. */
router.post('/', function (req, res, next) {

    let data = req.body;

    switch (data.table) {

        //Inserimento temperatura
        case 'temperature':
            database.query('INSERT INTO  temperature (StationName, Val) VALUES (\'' + data.StationName + '\', \'' + data.Val + '\')',
                function (err, rows, fields) {
                    if (err) throw err;
                    console.log('INSERTED IN temperature (StationName: ' + data.StationName + ', Val: ' + data.Val + ')');
                });
            break;

        //Inserimento pressione
        case 'pressure':
            database.query('INSERT INTO pressure (StationName, Val) VALUES (\'' + data.StationName + '\', \'' + data.Val + '\')',
                function (err, rows, fields) {
                    if (err) throw err;
                    console.log('INSERTED IN pressure (StationName: ' + data.StationName + ', Val: ' + data.Val + ')');
                });
            break;
    }

    res.send('ok');
})
;

module.exports = router;
