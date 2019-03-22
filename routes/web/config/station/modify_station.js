var express = require('express');
var router = express.Router();

const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');

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

        var update_station_query = 'UPDATE Station SET StationName=\'' +
            req.body.ModifyStationName + '\', Location=\'' +
            req.body.ModifyLocation + '\', Latitude=\'' +
            req.body.ModifyLatitude + '\', Longitude=\'' +
            req.body.ModifyLongitude + '\', Altitude=\'' +
            req.body.ModifyAltitude + '\', IP=\'' +
            req.body.ModifyIP + '\' WHERE Id=\'' +
            req.body.ModifyId + '\'';

        database.query(update_station_query, function (err, rows) {
            if (err) error.errorHandler(err, req, res);
            res.redirect('/config/configuration');
        });
    }
)
;

module.exports = router;