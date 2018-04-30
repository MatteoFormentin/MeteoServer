var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var temp = 0;
    var pres = 0;
    var temp_query;
    var pres_query;

    console.log(req.query.limit);

    switch (req.query.limit) {
        case undefined:
            temp_query = 'SELECT * FROM temperature'
            pres_query = 'SELECT * FROM pressure'
            break;
        default:
            temp_query = 'SELECT * FROM temperature LIMIT ' + req.query.limit;
            pres_query = 'SELECT * FROM pressure LIMIT ' + req.query.limit;
            break;
    }

    database.query(temp_query, function (err, rows) {
        if (err) throw err;
        console.log(rows);
        temp = rows;
        database.query(pres_query, function (err, rows) {
            if (err) throw err;
            console.log(rows);
            pres = rows;
            res.render('history', {title: 'Meteo Server', temperatura: temp, pressione: pres});
        });
    });

});

module.exports = router;
