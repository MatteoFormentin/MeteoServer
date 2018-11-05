var express = require('express');

module.exports.errorHandler = (err, req, res) => {
    console.error("An error occur");
    console.error(err.message);
    console.error(err.stack);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
};

module.exports.errorHandlerAPI = (err, req, res) => {
    console.error("An error occur while processing API calls");
    console.error(err.message);
    console.error(err.stack);

    res.send('no');
};

