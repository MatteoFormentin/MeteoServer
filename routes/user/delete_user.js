var express = require('express');
var router = express.Router();

/* POST delete user. */
router.post('/', isAuthenticated, function (req, res, next) {
        var delete_user_query = 'DELETE FROM User WHERE Id=\'' + req.body.UserId + '\'';

        database.query(delete_user_query, function (err, rows) {
            if (err) throw err;
            res.redirect('/config/configuration');
        });
    }
);

module.exports = router;
