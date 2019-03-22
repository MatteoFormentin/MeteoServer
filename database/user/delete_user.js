var express = require('express');

module.exports.deleteUser = async function (user_id) {
    var delete_user_query = 'DELETE FROM User WHERE Id=?';

    database.asynchQuery(delete_user_query, [
        user_id
    ]);
}



