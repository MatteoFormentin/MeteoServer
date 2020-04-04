var express = require('express');

module.exports.modifyUserPassword = async function (email, name, admin, id, password) {
    let res;
    try {
        var query = 'UPDATE User SET Email=?, Name=?, Password=?, Admin=? WHERE Id=?';
        res = await database.asynchQuery(query, [
            email,
            name,
            password,
            admin,
            id
        ]);

    } catch (err) {
        logger.error("Error modifing password for users id: " + id);
        throw err;
    }
    return res;
}

module.exports.modifyUser = async function (email, name, admin, id) {
    let res;
    try {
        var query = 'UPDATE User SET Email=?, Name=?, Admin=? WHERE Id=?';
        res = await database.asynchQuery(query, [
            email,
            name,
            admin,
            id
        ]);
    } catch (err) {
        logger.error("DATABASE: Error modifing users id: " + id);
        throw err;
    }
    return res;
}