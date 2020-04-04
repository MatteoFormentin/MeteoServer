var express = require('express');

module.exports.deleteFirmwareUpdate = async function (update_id) {
    var delete_user_query = 'DELETE FROM FirmwareUpdate WHERE Id=?';

    let res;
    try {
        res = await database.asynchQuery(delete_user_query, [
            update_id
        ]);
    } catch (err) {
        logger.error("DATABASE: Error deleting firmware update id: " + id);
        throw err;
    }
    return res;
}



