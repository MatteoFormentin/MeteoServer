var express = require('express');
var router = express.Router();

/* POST new station. */
router.post('/', isAuthenticated, function (req, res, next) {

        if (req.body.Password == req.body.PasswordConfirm) {

            var insert_user_query = 'INSERT INTO User(Email, Name, Password) VALUES (\'' +
                req.body.Email + '\', \'' +
                req.body.Name + '\', \'' +
                req.body.Password + '\')';

            console.log(insert_user_query);

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