var express = require('express');
var router = express.Router();

/* GET configuration page. */
router.get('/', isAuthenticated, isAdmin, function (req, res, next) {
    var station;
    var user;
    var update;

    async function query() {
        station = await database.asynchQuery('SELECT * FROM Station');
        user = await database.asynchQuery('SELECT * FROM User');
        update = await database.asynchQuery('SELECT * FROM FirmwareUpdate');
    }

    query().then(() => {
        res.render('./config/configuration', {
            title: 'Meteo Server',
            logged_user: req.user,
            message: req.flash(),
            station: station,
            user: user,
            update: update
        });
    }).catch((err) => error.errorHandler(err, req, res));
});

module.exports = router;
