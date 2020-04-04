var express = require('express');

module.exports.modifyUser = async function (email, name, password, admin, id) {
    let res;
    try {
        if (password) {
            var query = 'UPDATE User SET Email=?, Name=?, Password=?, Admin=? WHERE Id=?';
            res = await database.asynchQuery(query, [
                email,
                name,
                password,
                admin,
                id
            ]);
        } else {
            var query = 'UPDATE User SET Email=?, Name=?, Admin=? WHERE Id=?';
            res = await database.asynchQuery(query, [
                email,
                name,
                admin,
                id
            ]);
        }
    } catch (err) {
        logger.error("Error logging users id: " + id);
        throw err;
    }
    return res;
}