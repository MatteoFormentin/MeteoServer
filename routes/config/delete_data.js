var express = require('express');
var router = express.Router();

/* POST delete data. */
router.post('/', isAuthenticated, isAdmin, function (req, res, next) {
        var delete_data_query = 'DELETE FROM ';

        switch (req.body.Type) {
            case "Temperature":
                delete_data_query += "Temperature ";
                break;

            case "Humidity":
                delete_data_query += "Humidity ";
                break;

            case "Pressure":
                delete_data_query += "Pressure ";
                break;

            case "Rain":
                delete_data_query += "Rain ";
                break;

            case "Wind":
                delete_data_query += "Wind ";
                break;

            case "Lighting":
                delete_data_query += "Lighting ";
                break;

        }

        delete_data_query += "WHERE Id=\'" + req.body.Id + "\' AND Stamp=\'" + dateConvert.dateToTimeStampSecond(new Date(req.body.Stamp + 'Z')) + "\'";

        database.query(delete_data_query, function (err, rows) {
            if (err) throw err;
            req.flash('info', 'Dato Eliminato');
            res.redirect('back');
        });
    }
);

module.exports = router;
