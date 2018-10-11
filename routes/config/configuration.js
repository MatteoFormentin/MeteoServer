var express = require('express');
var router = express.Router();

/* GET configuration page. */
router.get('/', isAuthenticated, isAdmin, function (req, res, next) {
        var station;
    var user;

        database.query('SELECT * FROM Station', function (err, rows) {
            if (err) throw err;
            //console.log(rows);
            station = rows;
            database.query('SELECT * FROM User', function (err, rows) {
                if (err) throw err;
                //console.log(rows);
                user = rows;

                res.render('./config/configuration', {
                    title: 'Meteo Server',
                    logged_user: req.user,
                    message: req.flash(),
                    station: station,
                    user: user
                });
            });
        });
    }
);

module.exports = router;
