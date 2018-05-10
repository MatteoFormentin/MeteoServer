var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.render('/')
    }
    else {
        res.render('login', {message: req.flash('info')});
    }
});


router.post('/',
    passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = router;