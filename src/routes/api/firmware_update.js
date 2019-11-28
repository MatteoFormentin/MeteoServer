var express = require('express');
var router = express.Router();
var path = require('path');
var crypto = require('crypto');
var fs = require('fs');


/* GET update for station. Param station_model will be choosen by the station */
router.get('/:station_model', function (req, res, next) {
    //Check if request come from an ESP8266
    //TODO: PLACE ON THE FOLLOWING IF TOKEN CHECK
    console.log(req.params.station_model)
    if (req.get('User-Agent') === 'ESP8266-http-Update') {
        db.queryUpdateAvailable(req.params.station_model).then((station_update_available) => {
            //Check if update available and if version is greater than onboard
            if (station_update_available && station_update_available.version > req.get('x-esp8266-version')) {
                let file_path;
                file_path = path.join(WORKING_DIR, 'firmware_update', station_update_available.file_name); //Working dir is declared in app.js
                
                //Send file
                res.status(200);
                res.set({
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': 'attachment; filename=update.bin',
                    'Content-Length': fs.statSync(file_path).size,
                    'x-MD5': crypto.createHash('md5').update(fs.readFileSync(file_path)).digest('hex')
                });
                res.sendFile(file_path, 'update.bin');
            }
            //If no update found or onboard version greater
            else {
                res.status(500);
                res.send('500 No update available');
            }
        }).catch((err) => {
            error.errorHandlerAPI(err, req, res)
        });
    }
    //If not an ESP8266 Unauthorized
    else {
        res.status(403);
        res.send('403 Forbidden');
    }
});

module.exports = router;
