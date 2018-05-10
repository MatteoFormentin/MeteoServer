var express = require('express');
var router = express.Router();

/* POST delete station. */
router.post('/', isAuthenticated, function (req, res, next) {
        var delete_station_query = 'DELETE FROM Station WHERE Id=\'' + req.body.Id + '\'';
        console.log(delete_station_query);

        database.query(delete_station_query, function (err, rows) {
            if (err) throw err;
            res.redirect('/config/configuration');
        });
    }
);

module.exports = router;
