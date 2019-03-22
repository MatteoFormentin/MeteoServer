var express = require('express');

module.exports.getUserById = async function (user_id) {
    var query = 'SELECT Id, Email, Name, Admin FROM User WHERE Id = ?';

    let user = database.asynchQuery(query, [
        user_id
    ]);
    return user;
}