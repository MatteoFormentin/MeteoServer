var express = require('express');

module.exports = async function (id, val) {
    await database.asynchQuery('INSERT INTO  Temperature (Id, Val, Stamp) VALUES (\'' + id + '\', \'' + val + '\', \''
        + timestamp + '\')');
}
