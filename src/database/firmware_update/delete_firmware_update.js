var express = require('express');

module.exports.deleteFirmwareUpdate = async function (update_id) {
    var delete_user_query = 'DELETE FROM FirmwareUpdate WHERE Id=?';

    database.asynchQuery(delete_user_query, [
        update_id
    ]);
}



