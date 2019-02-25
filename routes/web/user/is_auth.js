var express = require('express');


module.exports = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "Effettua l'accesso.");
        res.redirect("/login");
    }
};