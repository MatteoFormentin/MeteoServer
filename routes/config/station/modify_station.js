var express = require('express');
var router = express.Router();

/* GET configuration page. */
router.get('/:Id', function (req, res, next) {
        res.render('/config/station/modify_station');
    }
);

module.exports = router;
