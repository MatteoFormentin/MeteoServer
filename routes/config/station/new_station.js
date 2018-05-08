var express = require('express');
var router = express.Router();

/* POST new station. */
router.post('/', function (req, res, next) {

    var insert_station_query = 'INSERT INTO Station (StationName, Location, Altitude, IP, Token) VALUES (\'' +
            req.body.StationName + '\', \'' +
            req.body.Location + '\', \'' +
        req.body.Altitude + '\', \'' +
            req.body.IP + '\', \'' +
            uuidv4() + '\')';
        console.log(insert_station_query);

        database.query(insert_station_query, function (err, rows) {
            if (err) throw err;
            res.redirect('/config/configuration');
        });
    }
);

module.exports = router;
