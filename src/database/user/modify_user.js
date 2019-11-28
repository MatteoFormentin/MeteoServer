var express = require('express');

module.exports.modifyUser = async function (email, name, password, admin, id) {

    if (password) {
        var query = 'UPDATE User SET Email=?, Name=?, Password=?, Admin=? WHERE Id=?';

        database.asynchQuery(query, [
            email,
            name,
            password,
            admin,
            id
        ]);
    } else {
        var query = 'UPDATE User SET Email=?, Name=?, Admin=? WHERE Id=?';

        database.asynchQuery(query, [
            email,
            name,
            admin,
            id
        ]);
    }
}