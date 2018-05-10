var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.render('/')
    }
    else {
        //req.flash('info',"welcome");
        res.render('login', {message: req.flash()});
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