var express = require('express');

module.exports.createUser = async function (email, name, password, admin) {
    var query = 'INSERT INTO User(Email, Name, Password, Admin) VALUES (?, ?, ?, ?)';
    let res;
    try {
        res = await database.asynchQuery(query, [
            email,
            name,
            password,
            admin
        ]);
    } catch (err) {
        logger.error("DATABASE: Error creating user email: " + email);
        throw err
    };

    return res;
}