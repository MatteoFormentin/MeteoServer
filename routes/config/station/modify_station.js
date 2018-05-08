var express = require('express');
var router = express.Router();

/* GET configuration page. */
router.post('/', function (req, res, next) {

    //UPDATE `Station` SET `StationName`=[value-2],`Location`=[value-3],`IP`=[value-4] WHERE Id = 1

    var update_station_query = 'UPDATE Station SET StationName=\'' +
        req.body.ModifyStationName + '\', Location=\'' +
        req.body.ModifyLocation + '\', Altitude=\'' +
        req.body.ModifyAltitude + '\', IP=\'' +
        req.body.ModifyIP + '\' WHERE Id=\'' +
        req.body.ModifyId + '\''
    ;

    //console.log(update_station_query);

    database.query(update_station_query, function (err, rows) {
        if (err) throw err;
        res.redirect('/config/configuration');
    });
});

module.exports = router;
