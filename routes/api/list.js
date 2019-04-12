var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    db.listStation().then((data) => {
        if (data != undefined) {
            res.json(data);
        } else {
            res.json(
                {
                    error: {
                        //errors: [],
                        code: "404",
                        message: "No station found"
                    }
                }
            );
        }
    }).catch((err) => {
        error.errorHandlerAPI(err, req, res)
    });
});

module.exports = router;
