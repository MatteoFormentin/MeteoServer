var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

/* POST modify user. */
router.post('/', isAuthenticated, [
    check('ModifyUserEmail').exists().isEmail().withMessage('Inserisci una mail valida'),
    check('ModifyUserName').exists().withMessage('Inserisci un nome utente')
], function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('info', errors.array()[0].msg);
        return res.redirect('/config/configuration');
    }

    var update_user_query;
    var admin_on = 'false';
    if (req.body.ModifyUserAdmin === 'on') {
        admin_on = 'true';
    }

    if (req.body.ModifyUserPassword !== "") {
        if (req.body.ModifyUserPassword === req.body.ModifyUserPasswordConfirm) {
            let hash = crypto.createHash('sha256');
            db.modifyUser(req.body.ModifyUserEmail, req.body.ModifyUserName, hash.update(req.body.ModifyUserPassword).digest('hex'), admin_on, req.body.ModifyUserId);
        }
        else {
            req.flash('info', 'Le password non corrispondono');
            res.redirect('/config/configuration');
        }
    }
    else {
        db.modifyUser(req.body.ModifyUserEmail, req.body.ModifyUserName, admin_on, req.body.ModifyUserId);
    }
    res.redirect('/config/configuration');
});

module.exports = router;
