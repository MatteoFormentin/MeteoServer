var express = require('express');
var router = express.Router();

/* GET single or all station. */
router.get('/:station_id', function (req, res, next) {
    //Execute the async function
    if (req.params.station_id != undefined) {
        db.querySingleStationLastData(req.params.station_id).then((data) => {
            if (data) res.render('station', {
                title: 'Meteo Server',
                logged_user: req.user,
                message: req.flash(),
                data: data
            });
            else res.redirect("/");
        }).catch((err) => {
            req.flash('info', 'Errore');
            res.redirect('/');
        });
    } else {
        res.redirect("/");
    }
});

module.exports = router;
