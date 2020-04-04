var express = require('express');
var router = express.Router();

/* POST new data from sensor. */
router.post('/', function (req, res, next) {
    let data = req.body;
    

    if (!data) {
        res.json(
            {
                error: {
                    //errors: [],
                    code: "400",
                    message: "Bad request"
                }
            }
        );
    }

    db.updateStationData(data).then((result) => {
        if (result) {
            res.send('ok');
        } else {
            res.json(
                {
                    error: {
                        //errors: [],
                        code: "401",
                        message: "Unhauthorized"
                    }
                }
            );
        }
    }).catch((err) => {
        error.errorHandlerAPI(err, req, res)
        res.json(
            {
                error: {
                    //errors: [],
                    code: "500",
                    message: "Iternal Server Error"
                }
            }
        );
    });

});

module.exports = router;
