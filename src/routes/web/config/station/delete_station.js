var express = require('express');
var router = express.Router();

/* POST delete station. */
router.post('/', isAuthenticated, isAdmin, function (req, res, next) {
    db.deleteStation(req.body.Id).then((res) => {
        req.flash('info', 'Stazione eliminata');
        res.redirect('/config/configuration');
    }).catch((err) => {
        req.flash('info', 'Errore');
        res.redirect('/config/configuration');
    });
});

module.exports = router;
