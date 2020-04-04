var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

/* GET configuration page. */
router.post('/', isAuthenticated, isAdmin, [
    check('ModifyStationName').exists().withMessage('Inserisci un nome'),
    check('ModifyLocation').exists().withMessage('Inserisci un luogo'),
    check('ModifyLatitude').exists().isFloat().withMessage('Inserisci una latitudine'),
    check('ModifyLongitude').exists().isFloat().withMessage('Inserisci un longitudine'),
    check('ModifyAltitude').exists().isInt().withMessage('Inserisci una altitudine')
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('info', errors.array()[0].msg);
        return res.redirect('/config/configuration');
    }

    db.modifyStation(req.body.ModifyStationName, req.body.ModifyLocation, req.body.ModifyLatitude, req.body.ModifyLongitude, req.body.ModifyAltitude, req.body.ModifyId).then((result) => {
        req.flash('info', 'Stazione modificata');
        res.redirect('/config/configuration');
    }).catch((err) => {
        req.flash('info', 'Errore');
        res.redirect('/config/configuration');
    });
});

module.exports = router;
