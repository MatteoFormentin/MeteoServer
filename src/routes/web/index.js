var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    //Execute the async function
    db.queryLastDataFromAllStation().then((data) => {
        if (req.device.type === "phone") {
            res.render('mobile/m_index', {
                title: 'Meteo Server',
                logged_user: req.user,
                message: req.flash(),
                data: data
            });
        } else {
            res.render('index', {
                title: 'Meteo Server',
                logged_user: req.user,
                message: req.flash(),
                data: data
            });
        }
    }).catch((err) => {
        req.flash('info', 'Errore');
        res.redirect('/');
    });
});

module.exports = router;
