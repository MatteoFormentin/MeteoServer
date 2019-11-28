var express = require('express');

module.exports.loginUser = async function (user_email, user_password) {
    var query = 'SELECT * FROM User WHERE Email = ? AND Password=?';

    let user = database.asynchQuery(query, [
        user_email,
        user_password
    ]);
    return user;
}