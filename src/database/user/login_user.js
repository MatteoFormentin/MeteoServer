var express = require('express');

module.exports.loginUser = async function (user_email, user_password) {
    var query = 'SELECT Id, Email, Name, Admin FROM User WHERE Email = ? AND Password=?';
    let user;
    try {
        let res = await database.asynchQuery(query, [
            user_email,
            user_password
        ]);

        if (res == undefined) {
            user = undefined;
        } else {
            user = {
                id: res[0].Id,
                email: res[0].Email,
                name: res[0].Name,
                admin: res[0].Admin
            }
        }
    } catch (err) {
        logger.error("DATABASE: Error logging users id: " + id);
        throw err;
    }

    return user;
}