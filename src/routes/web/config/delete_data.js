var express = require('express');
var router = express.Router();

/* POST delete data. */
router.post('/', isAuthenticated, isAdmin, function (req, res, next) {
    let time = moment.utc(req.body.Stamp, "D/M/Y H:mm").format("Y-M-D H:mm");

    switch (req.body.Type) {
        case "Temperature":
            db.deleteSingleTemperature(req.body.Id, time);
            break;

        case "Humidity":
            db.deleteSingleHumidity(req.body.Id, time);
            break;

        case "Pressure":
            db.deleteSinglePressure(req.body.Id, time);
            break;

        case "Rain":
            db.deleteSingleRain(req.body.Id, time);
            break;

        case "Wind":
            db.deleteSingleWind(req.body.Id, time);
            break;

        case "Lighting":
            db.deleteSingleLighting(req.body.Id, time);
            break;

        case "AirQuality":
            db.deleteSingleAirQuality(req.body.Id, time);
            break;
    }


    res.redirect('back');
});

module.exports = router;
