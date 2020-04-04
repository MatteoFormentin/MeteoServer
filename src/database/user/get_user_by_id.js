var express = require('express');

module.exports.getUserById = async function (id) {
    var query = 'SELECT Id, Email, Name, Admin FROM User WHERE Id = ?';
    let user;
    try {
        user = await database.asynchQuery(query, [id]);
    } catch (err) {
        logger.error("Error getting users id: " + id);
        throw err;
    }
    return user[0];
}