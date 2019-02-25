var express = require('express');
var router = express.Router();
var path = require('path');
var crypto = require('crypto');

/* GET single station. */
router.get('/:station_model', function (req, res, next) {
    console.log(path.join(WORKING_DIR, 'firmware_update/esp_station_rev1/test.bin'));
    var file_path;
    switch (req.params.station_model) {
        case ('esp_station_rev1'):
            file_path = path.join(WORKING_DIR, 'firmware_update/esp_station_rev1/ciao.ex')
            break;

        default:
            res.json(
                {
                    error: {
                        //errors: [],
                        code: "404",
                        message: "Update for that model not found"
                    }
                }
            );
    }

    res.download(file_path, 'update.bin');
});

module.exports = router;
