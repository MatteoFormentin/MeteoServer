var express = require('express');

module.exports.createUser = async function (email, name, password, admin) {
    var query = 'INSERT INTO User(Email, Name, Password, Admin) VALUES (?, ?, ?, ?)';

    database.asynchQuery(query, [
        email,
        name,
        password,
        admin
    ]);
}