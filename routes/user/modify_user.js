var express = require('express');
var router = express.Router();

/* GET configuration page. */
router.post('/', isAuthenticated, function (req, res, next) {
    var update_user_query;
    if (req.body.ModifyUserPassword !== undefined && req.body.ModifyUserPassword == req.body.ModifyUserPasswordConfirm) {
        update_user_query = 'UPDATE User SET Email=\'' +
            req.body.ModifyUserEmail + '\', Name=\'' +
            req.body.ModifyUserName + '\', Password=\'' +
            req.body.ModifyUserPassword + '\'' +
            ' WHERE Id=\'' +
            req.body.ModifyUserId + '\'';
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
