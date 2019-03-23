var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }
    else {
        //req.flash('info',"welcome");
        if (req.device.type === "phone") {
            res.render('mobile/m_login', {
                title: 'Meteo Server',
                logged_user: req.user,
                message: req.flash()
            });
        } else {
            res.render('login', {
                title: 'Meteo Server',
                logged_user: req.user,
                message: req.flash()
            });
        }

    }
});

//Dati inviati per effettuare il login
router.post('/',
    passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

module.exports = router;