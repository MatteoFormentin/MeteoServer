var express = require('express');
var router = express.Router();

/* POST delete user. */
router.post('/', isAuthenticated, function (req, res, next) {
    if (!(parseInt(req.user.Id) === parseInt(req.body.UserId))) {
        db.deleteUser(req.body.UserId).then((result) => {
            req.flash('info', 'Utente cancellato');
            res.redirect('/config/configuration');
        }).catch(
            (err) => {
                req.flash('info', 'Errore');
                res.redirect('/config/configuration');
            }
        )

    } else {
        req.flash('info', 'Impossibile cancellare l\'utente loggato');
        res.redirect('/config/configuration');
    }
});

module.exports = router;
