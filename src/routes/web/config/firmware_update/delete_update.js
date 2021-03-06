var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path')

/* POST delete update. */
router.post('/', isAuthenticated, isAdmin, function (req, res, next) {
    var file_path;
    db.queryUpdateById(req.body.Id).then((update) => {
        file_path = path.join(WORKING_DIR, 'firmware_update', update.file_name);
        try {
            fs.unlinkSync(file_path);
        } catch (err) {
            logger.error("Error delting firmware update file from server");
        }
    }).then(db.deleteFirmwareUpdate(req.body.Id)).then((result) => {
        req.flash('info', 'Aggiornamento cancellato');
        res.redirect('/config/configuration');
    }).catch((err) => {
        req.flash('info', 'Errore');
        res.redirect('/config/configuration');
    });
});

module.exports = router;