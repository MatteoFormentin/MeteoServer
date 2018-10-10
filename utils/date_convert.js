var express = require('express');


function dateToTimeStamp(date) {
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hour = addZero(date.getHours());
    let minute = addZero(date.getMinutes());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

function dateFormatter(date) {
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hour = addZero(date.getUTCHours());
    let minute = addZero(date.getMinutes());
    return day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
}

function yesterdayTimeStamp() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return dateToTimeStamp(date);
}

function hourAgoTimeStamp(ago) {
    let date = new Date();
    date.setHours(date.getHours() - ago);
    return dateToTimeStamp(date);
}


function addZero(d) {
    if (d.toString().length < 2) {
        return '0' + d;
    }
    else return d;
}

module.exports.dateToTimeStamp = dateToTimeStamp;
module.exports.dateFormatter = dateFormatter;
module.exports.yesterdayTimeStamp = yesterdayTimeStamp;
module.exports.hourAgoTimeStamp = hourAgoTimeStamp;
