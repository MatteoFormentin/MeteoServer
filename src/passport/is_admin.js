var express = require('express');


module.exports = function ensureAdmin(req, res, next) {
    if (req.user.admin === 'true') {
        next();
    } else {
        req.flash("info", "Non disponi dei permessi di amministratore.");
        res.redirect("/");
    }
};