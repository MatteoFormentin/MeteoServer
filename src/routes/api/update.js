var express = require('express');
var router = express.Router();

/* POST new data from sensor. */
router.post('/', function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let data = req.body;
    if (!data) {
        logger.error('API: Bad request from station update (no data sended)\nStation IP: ' + ip);
        res.status(400);
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
            logger.info("API: New data from station\nModel:" + req.params.data.model + '\nStation IP: ' + ip);
            res.status(200);
            res.send('ok');
        } else {
            logger.info("API: Unathorized data update\nData: " + req.params.data + '\nStation IP: ' + ip);
            res.status(401);
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
        logger.error("API: Error processing station update\nData: " + req.params.data + '\nStation IP: ' + ip);
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
