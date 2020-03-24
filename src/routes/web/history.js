var express = require('express');
var router = express.Router();

/* GET history page. */
router.get('/', isAuthenticated, function (req, res, next) {

    //Check for empty date - limit result to current day
    let date_start;
    if (req.query.date_start) {
        date_start = moment.utc(req.query.date_start).format("Y-M-D H:mm");
    } else {
        date_start = moment.utc().startOf('day').format("Y-M-D H:mm");
    }

    let date_end;
    if (req.query.date_end) {
        date_end = moment.utc(req.query.date_end).format("Y-M-D H:mm");
    } else {
        date_end = moment.utc().format("Y-M-D H:mm");
    }

    //Elenco stazioni per menu selezione
    db.listStation().then((rows) => {
        let station = rows;

        //A station is selected
        if (req.query.station_id && !(req.query.station_id === '0')) {
            db.queryHistoryStationData(req.query.station_id, date_start, date_end).then((data) => {
                if (req.device.type === "phone") {
                    res.render('mobile/history/m_chart', {
                        title: 'Meteo Server',
                        logged_user: req.user,
                        type: 0,
                        data: data,
                        station: station,
                        date_start: date_start,
                        date_end: date_end
                    });
                } else if (req.query.type === "0") {
                    res.render('history/chart', {
                        title: 'Meteo Server',
                        logged_user: req.user,
                        type: 0,
                        data: data,
                        station: station,
                        date_start: date_start,
                        date_end: date_end
                    });
                } else if (req.query.type === "1") {
                    res.render('history/table', {
                        title: 'Meteo Server',
                        logged_user: req.user,
                        type: 1,
                        data: data,
                        station: station,
                        date_start: date_start,
                        date_end: date_end
                    });
                }
            }).catch((err) => {
                error.errorHandler(err, req, res)
            });

        } else { //Se non è selezionata una stazione non visualizzare niente
            if (req.device.type === "phone") {
                res.render('mobile/history/m_history', {
                    title: 'Meteo Server',
                    logged_user: req.user,
                    message: req.flash(),
                    station: station,
                    date_start: date_start,
                    date_end: date_end
                });
            } else {
                res.render('history/history', {
                    title: 'Meteo Server',
                    logged_user: req.user,
                    message: req.flash(),
                    station: station,
                    date_start: date_start,
                    date_end: date_end
                });
            }
        }
    });
});

module.exports = router;
