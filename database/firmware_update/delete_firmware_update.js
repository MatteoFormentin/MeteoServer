var express = require('express');

module.exports.deleteUser = async function (update_id) {
    var delete_user_query = 'DELETE FROM FirmwareUpdate WHERE Id=?';

    database.asynchQuery(delete_user_query, [
        update_id
    ]);
}



