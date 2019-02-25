var express = require('express');
var router = express.Router();

/* GET configuration page. */
router.get('/', isAuthenticated, isAdmin, function (req, res, next) {
    var station;
    var user;

    async function query() {
        station = await database.asynchQuery('SELECT * FROM Station');
        user = await database.asynchQuery('SELECT * FROM User');
    }

    query().then(() => {
        res.render('./config/configuration', {
            title: 'Meteo Server',
            logged_user: req.user,
            message: req.flash(),
            station: station,
            user: user
        });
    }).catch((err) => error.errorHandler(err, req, res));
});

module.exports = router;
