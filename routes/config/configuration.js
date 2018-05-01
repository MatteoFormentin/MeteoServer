var express = require('express');
var router = express.Router();

/* GET configuration page. */
router.get('/', function (req, res, next) {

        var station;

        database.query('SELECT * FROM Station', function (err, rows) {
            if (err) throw err;
            console.log(rows);
            station = rows;

            res.render('./config/configuration', {station: station});
        });
    }
);

module.exports = router;
