var express = require('express');

module.exports.deleteStation = async function (id) {
    var delete_user_query = 'DELETE FROM Station WHERE Id=?';
    let res;
    try {
        res = await database.asynchQuery(delete_user_query, [id]);
    } catch (err) {
        logger.error("DATABASE: Error deleting station id: " + id);
        throw err;
    }
    return res;
}



