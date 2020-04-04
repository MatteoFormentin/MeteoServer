var express = require('express');

module.exports.deleteUser = async function (user_id) {
    var query = 'DELETE FROM User WHERE Id=?';
    let res;
    try {
        res = await database.asynchQuery(query, [
            user_id
        ]);
    }catch(err){
        logger.error("Error deleting user id: " + id);
        throw err
    };
}



