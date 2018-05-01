var express = require('express');
var router = express.Router();

/* GET home page. */
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
