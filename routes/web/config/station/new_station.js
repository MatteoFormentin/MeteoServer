var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

/* POST new station. */
router.post('/', isAuthenticated, isAdmin, [
    check('StationName').exists().withMessage('Inserisci un nome'),
    check('Location').exists().withMessage('Inserisci un luogo'),
    check('Latitude').exists().isFloat().withMessage('Inserisci una latitudine'),
    check('Longitude').exists().isFloat().withMessage('Inserisci un longitudine'),
    check('Altitude').exists().isInt().withMessage('Inserisci una altitudine')
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('info', errors.array()[0].msg);
        return res.redirect('/config/configuration');
    }

    let timestamp = dateConvert.dateToTimeStampSecond(new Date());

    var insert_station_query = 'INSERT INTO Station (StationName, Location, Latitude, Longitude, Altitude, IP, Token, LastUpdate) VALUES (\'' +
        req.body.StationName + '\', \'' +
        req.body.Location + '\', \'' +
        req.body.Latitude + '\', \'' +
        req.body.Longitude + '\', \'' +
        req.body.Altitude + '\', \'' +
        req.body.IP + '\', \'' +
        uuidv4() + '\', \'' +
        timestamp + '\')';

    database.query(insert_station_query, function (err, rows) {
        if (err) error.errorHandler(err, req, res);
        req.flash('info', 'Stazione creata');
        res.redirect('/config/configuration');
    });
});

module.exports = router;
