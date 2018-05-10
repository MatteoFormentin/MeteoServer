var express = require('express');
var router = express.Router();

const {check, validationResult} = require('express-validator/check');
const {matchedData, sanitize} = require('express-validator/filter');


/* POST new user. */
router.post('/', isAuthenticated, [
        check('Email').isEmail().withMessage('Inserisci una mail valida'),
        check('Name').exists(),
        check('Password', 'passwords must be at least 5 chars long ')
            .isLength({min: 5})
    ], function (req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.redirect('/config/configuration');
        }

        if (req.body.Password == req.body.PasswordConfirm) {

            var insert_user_query = 'INSERT INTO User(Email, Name, Password) VALUES (\'' +
                req.body.Email + '\', \'' +
                req.body.Name + '\', \'' +
                req.body.Password + '\')';

            //console.log(insert_user_query);

            database.query(insert_user_query, function (err, rows) {
                if (err) throw err;
                res.redirect('/config/configuration');
            });
        }
        else {
            res.redirect('/config/configuration');
        }
    }
);

module.exports = router;