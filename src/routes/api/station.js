var express = require('express');
var router = express.Router();

/* GET single or all station. */
router.get('/:station_id', function (req, res, next) {
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
                error.errorHandler(err, req, res)
            });
        } else { //GET LAST DATA
            db.querySingleStationLastData(req.params.station_id).then((data) => {
                if (data) {
                    res.json(data);
                } else {
                    res.json(getNotFound());
                }
            }).catch((err) => {
                error.errorHandlerAPI(err, req, res)
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
        error.errorHandlerAPI(err, req, res)
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

