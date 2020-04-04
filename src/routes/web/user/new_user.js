var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');


/* POST new user. */
router.post('/', isAuthenticated, [
    check('Email').isEmail().withMessage('Inserisci una mail valida'),
    check('Name').exists(),
    check('Password').exists().isLength({ min: 5 }).withMessage('La password deve essere lunga almeno 5 caratteri')
], function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('info', errors.array()[0].msg);
        return res.redirect('/config/configuration');
    }

    if (req.body.Password === req.body.PasswordConfirm) {
        var admin_on = 'false';
        if (req.body.Admin === 'on') {
            admin_on = 'true';
        }

        let hash = crypto.createHash('sha256');
        db.createUser(req.body.Email, req.body.Name, hash.update(req.body.Password).digest('hex'), admin_on).then((result) => {
            req.flash('info', 'Utente creato');
            res.redirect('/config/configuration');
        }).catch((err) => {
            req.flash('info', 'Errore');
            res.redirect('/config/configuration');
        })
    } else {
        req.flash('info', 'Le password non corrispondono');
        res.redirect('/config/configuration');
    }

}
);

module.exports = router;