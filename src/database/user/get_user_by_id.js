var express = require('express');

module.exports.getUserById = async function (id) {
    var query = 'SELECT Id, Email, Name, Admin FROM User WHERE Id = ?';
    let user;
    try {
        let res = await database.asynchQuery(query, [id]);
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
        logger.error("DATABASE: Error getting users id: " + id);
        throw err;
    }
    return user;
}