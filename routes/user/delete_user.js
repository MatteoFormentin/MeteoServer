var express = require('express');
var router = express.Router();

/* POST delete user. */
router.post('/', isAuthenticated, function (req, res, next) {
    if (!(parseInt(req.user.Id) === parseInt(req.body.UserId))) {
        var delete_user_query = 'DELETE FROM User WHERE Id=\'' + req.body.UserId + '\'';

        database.query(delete_user_query, function (err, rows) {
            if (err) throw err;
            req.flash('info', 'Utente cancellato');
            res.redirect('/config/configuration');
        });
    } else {
        req.flash('info', 'Impossibile cancellare l\'utente loggato');
        res.redirect('/config/configuration');
    }
    }
);

module.exports = router;
