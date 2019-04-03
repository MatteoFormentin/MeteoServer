var express = require('express');
var router = express.Router();
var path = require('path');
var crypto = require('crypto');
var fs = require('fs');


/* GET update for station. Param station_model will be choosen by the station */
router.get('/:station_model', function (req, res, next) {
    //Check if request come from an ESP8266
    //TODO: PLACE ON THE FOLLOWING IF TOKEN CHECK
    if (req.get('User-Agent') === 'ESP8266-http-Update') {
        //place db query here
        db.queryUpdateAvailable(req.params.station_model).then((station_update_available) => {
            if (station_update_available) {
                //If upper version send update file
                if (checkVersion(station_update_available.version, req.get('x-esp8266-version'))) {
                    let file_path;
                    file_path = path.join(WORKING_DIR, station_update_available.path); //Working dir is declared in app.js
                    res.status(200);
                    res.set({
                        'Content-Type': 'application/octet-stream',
                        'Content-Disposition': 'attachment; filename=update.bin',
                        'Content-Length': fs.statSync(file_path).size,
                        'x-MD5': crypto.createHash('md5').update(fs.readFileSync(file_path)).digest('hex')
                    });
                    res.sendFile(file_path, 'update.bin');
                }

                //If same or lower version no update will be performed
                else {
                    res.status(304);
                    res.send('304 Not Modified');
                }
            }

            //If no update found
            else {
                res.status(500);
                res.send('500 No update available');
            }
        }).catch((err) => error.errorHandler(err, req, res));
    }
    //If not an ESP8266 Anauthorized
    else {
        res.status(403);
        res.send('403 Forbidden');
    }
});


/* 
 * Check if update is needed by comparing version number 
 * update_version: version found on system available for update
 * station_version: version currently on ESP8266
 * Ex 1.0.0, 0.0.1, ...
 */
function checkVersion(update_version, station_version) {
    let update_version_array = update_version.split('.');
    let station_version_array = station_version.split('.');

    try {
        if (update_version_array[0] > station_version_array[0]) return true;
        else if (update_version_array[0] < station_version_array[0]) return false;
        else if (update_version_array[0] = station_version_array[0]) {
            if (update_version_array[q] > station_version_array[1]) return true;
            else if (update_version_array[1] < station_version_array[1]) return false;
            else if (update_version_array[1] = station_version_array[1]) {
                if (update_version_array[2] > station_version_array[2]) return true;
                else if (update_version_array[20] <= station_version_array[2]) return false;
            }
        }
    } catch (err) {
        //Client error in version format
        return false;
    }
}

module.exports = router;
