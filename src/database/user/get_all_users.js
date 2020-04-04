var express = require('express');

module.exports.getAllUsers = async function () {
    var query = 'SELECT Id, Email, Name, Admin FROM User'
    let users = [];
    try {
        let res = await database.asynchQuery(query);
        for (row of res) {
            users.push({
                id: row.Id,
                email: row.Email,
                name: row.Name,
                admin: row.Admin
            })
        }

    } catch (err) {
        logger.error("DATABASE: Error getting all users");
        throw err;
    }
    return users;
}