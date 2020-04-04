var express = require('express');
var router = express.Router();

/* GET single or all station. */
router.get('/:station_id', function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (req.params.station_id) {
        //GET HISTORY DATA
        if (req.query.date_start && req.query.date_end) {
            db.queryHistoryStationData(req.params.station_id, req.query.date_start, req.query.date_end).then((data) => {
                if (data) {
                    res.json(data);
                } else {
                    res.json(getNotFound());
                }
            }).catch((err) => {
                logger.error('API: Error processing get station history data\nstation id: ' + req.params.station_id + '\nRemote IP: ' + ip);
                res.json(getServerError());
            });
        } else { //GET LAST DATA
            db.querySingleStationLastData(req.params.station_id).then((data) => {
                if (data) {
                    res.json(data);
                } else {
                    res.json(getNotFound());
                }
            }).catch((err) => {
                logger.error('API: Error processing get station last data\nstation id: ' + req.params.station_id + '\nRemote IP: ' + ip);
                res.json(getServerError());
            });
        }
    }
}).get('/', function (req, res, next) {
    db.listStation().then((data) => {
        if (data != undefined) {
            res.json(data);
        } else {
            res.json(getNotFound());
        }
    }).catch((err) => {
        logger.error('API: Error processing list all station'+ '\nRemote IP: ' + ip);
        res.json(getServerError());
    });
});


function getNotFound() {
    return {
        error: {
            //errors: [],
            code: "404",
            message: "Station not found"
        }
    }
}

function getServerError() {
    return {
        error: {
            //errors: [],
            code: "500",
            message: "Iternal Server Error"
        }
    }
}


module.exports = router;

