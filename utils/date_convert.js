var express = require('express');


function dateToTimeStamp(date) {
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hour = addZero(date.getHours());
    let minute = addZero(date.getMinutes());

    //console.log(year + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

function dateFormatter(date) {
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hour = addZero(date.getHours());
    let minute = addZero(date.getMinutes());

    //console.log(year + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes());
    return day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
}

function yesterdayTimeStamp() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
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
