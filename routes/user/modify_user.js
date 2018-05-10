var express = require('express');
var router = express.Router();

const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');

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
    if (req.body.ModifyUserPassword !== undefined) {
        if (req.body.ModifyUserPassword == req.body.ModifyUserPasswordConfirm) {
            update_user_query = 'UPDATE User SET Email=\'' +
                req.body.ModifyUserEmail + '\', Name=\'' +
                req.body.ModifyUserName + '\', Password=\'' +
                req.body.ModifyUserPassword + '\'' +
                ' WHERE Id=\'' +
                req.body.ModifyUserId + '\'';
        }
        else {
            req.flash('info', 'Le password non corrispondono');
            res.redirect('/config/configuration');
        }
    }
    else {
        update_user_query = 'UPDATE User SET Email=\'' +
            req.body.ModifyUserEmail + '\', Name=\'' +
            req.body.ModifyUserName + '\'' +
            ' WHERE Id=\'' +
            req.body.ModifyUserId + '\'';
    }

    database.query(update_user_query, function (err, rows) {
        if (err) throw err;
        res.redirect('/config/configuration');
    });
});

module.exports = router;
