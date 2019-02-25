var express = require('express');
var router = express.Router();

/* POST delete station. */
router.post('/', isAuthenticated, isAdmin, function (req, res, next) {
        var delete_station_query = 'DELETE FROM Station WHERE Id=\'' + req.body.Id + '\'';

        database.query(delete_station_query, function (err, rows) {
            if (err) error.errorHandler(err, req, res);
            req.flash('info', 'Stazione cancellata');
            res.redirect('/config/configuration');
        });
    }
);

module.exports = router;
