var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
const { check, validationResult } = require('express-validator/check');

var file_name;

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, path.join(WORKING_DIR, 'firmware_update'));
    },
    filename: (req, file, cb) => {
        file_name = req.body.Model + '_' + Date.now() + '.bin';
        return cb(null, file_name);
    }
});

var upload = multer({ storage: storage });

/* POST new update. */
router.post('/', upload.single('File'), isAuthenticated, isAdmin, [
    check('Model').exists().withMessage('Inserisci un Modello'),
    check('Version').exists().isLength({ min: 5, max: 5 })/*.matches('/([0-1]\.[0-1]\.[0-1])/')*/.withMessage('Inserisci una Versione'),
],
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('info', errors.array()[0].msg);
            return res.redirect('/config/configuration');
        }

        console.log(req);
        db.createFirmwareUpdate(req.body.Model, req.body.Version, file_name).then(() => {
            req.flash('info', 'Aggiornamento creato');
            res.redirect('/config/configuration');
        })
    });

module.exports = router;
