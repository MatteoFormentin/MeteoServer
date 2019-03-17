var express = require('express');
var router = express.Router();

/* GET single or all station. */
router.get('/:station_id', function (req, res, next) {
    //Execute the async function
    if (req.params.station_id != undefined) {
        db.querySingleStationLastData(req.params.station_id).then((data) => {
            res.json(data);
        }).catch((err) => {
            error.errorHandler(err, req, res)
        });
    } else {
        db.queryLastDataFromAllStation().then((data) => {
            if (data != undefined) {
                res.json(data);
            } else {
                res.json(
                    {
                        error: {
                            //errors: [],
                            code: "404",
                            message: "Station not found"
                        }
                    }
                );
            }
        }).catch((err) => {
            error.errorHandler(err, req, res)
        });
    }
});

module.exports = router;
