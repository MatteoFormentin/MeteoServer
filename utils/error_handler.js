var express = require('express');

module.exports.errorHandler = (err, req, res) => {
    console.error("An error occur");
    console.error(err.message);
    console.error(err.stack);
    res.redirect('/config/configuration');
};

module.exports.errorHandlerAPI = (err, req, res) => {
    console.error("An error occur while processing API calls");
    console.error(err.message);
    console.error(err.stack);
    res.send('no');
};

