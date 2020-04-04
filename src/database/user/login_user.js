var express = require('express');

module.exports.loginUser = async function (user_email, user_password) {
    var query = 'SELECT * FROM User WHERE Email = ? AND Password=?';
    let user;
    try {
        user = await database.asynchQuery(query, [
            user_email,
            user_password
        ]);
    } catch (err) {
        logger.error("Error logging users id: " + id);
        throw err;
    }
    return user[0];
}