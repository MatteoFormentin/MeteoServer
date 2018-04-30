var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
        var temp = 0;
        var pres = 0;
        var temp_query = 'SELECT * FROM temperature';
        var pres_query = 'SELECT * FROM pressure';

        if (req.query.date_start === '') {
            temp_query += ' WHERE Stamp BETWEEN \'2000-01-01T00:00\'';
            pres_query += ' WHERE Stamp BETWEEN \'2000-01-01T00:00\'';
        }
        else {
            temp_query += ' WHERE Stamp BETWEEN \'' + req.query.date_start + '\'';
            pres_query += ' WHERE Stamp BETWEEN \'' + req.query.date_start + '\'';
        }

        if (req.query.date_end === '') {
            temp_query += ' AND \'2100-01-01T00:00\'';
            pres_query += ' AND \'2100-01-01T00:00\'';
        }
        else {
            temp_query += ' AND \'' + req.query.date_end + '\'';
            pres_query += ' AND \'' + req.query.date_end + '\'';
        }

        console.log(temp_query);
        console.log(pres_query);

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

    }
);

module.exports = router;
