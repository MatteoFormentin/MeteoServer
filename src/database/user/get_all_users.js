var express = require('express');

module.exports.getAllUsers = async function () {
    var query = 'SELECT * FROM Station'
    let res;
    try {
        res = await database.asynchQuery(query);
    } catch (err) {
        logger.error("Error getting all users");
        throw err;
    }
    return res;
}