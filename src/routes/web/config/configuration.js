var express = require('express');
var router = express.Router();

/* GET configuration page. */
router.get('/', isAuthenticated, isAdmin, function (req, res, next) {

    var station;
    var user;
    var update;

    async function getData() {
        station = await db.getAllStations();
        user = await db.getAllUsers()
        update = await db.getAllFirmwareUpdates()
    }

    getData().then(
        (data) => {
            res.render('./config/configuration', {
                title: 'Meteo Server',
                logged_user: req.user,
                message: req.flash(),
                station: station,
                user: user,
                update: update
            });
        }).catch(
            (err) => {
                req.flash('info', 'Errore');
                res.redirect('/');
            }
        );
});



module.exports = router;


