var express = require('express');


module.exports = function ensureAdmin(req, res, next) {
    if (req.user.Admin === 'true') {
        next();
    } else {
        req.flash("info", "Non disponi dei permessi di amministratore.");
        res.redirect("/");
    }
};