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
            console.log(err);
        }
    }).then(db.deleteFirmwareUpdate(req.body.Id)).then(() => {
        req.flash('info', 'Aggiornamento cancellato');
        res.redirect('/config/configuration');
    }).catch((err) => error.errorHandler(err, req, res));
});

module.exports = router;