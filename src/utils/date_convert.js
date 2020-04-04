var express = require('express');

function checkOnline(d) {
    now = moment.utc()
    last_update = moment.utc(d, "D/M/Y H:mm")
    online = now.diff(last_update) <= 60 * 1000 * 60 * 2
    return online;
}

module.exports.checkOnline = checkOnline;
