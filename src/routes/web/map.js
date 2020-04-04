var express = require('express');
var router = express.Router();

/* GET map page. */

router.get('/', isAuthenticated, function (req, res, next) {
    db.queryLastDataFromAllStation().then((data) => {
        if (req.device.type === "phone") {
            res.render('mobile/m_map', {
                title: 'Meteo Server',
                stations_data: JSON.stringify(data),
                logged_user: req.user,
                message: req.flash(),
            });
        } else {
            res.render('map', {
                title: 'Meteo Server',
                stations_data: JSON.stringify(data),
                logged_user: req.user,
                message: req.flash(),
            });
        }
    }).catch((err) => error.errorHandler(err, req, res));
});

module.exports = router;
