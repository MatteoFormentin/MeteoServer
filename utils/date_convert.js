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
    let day = addZero(date.getUTCDate());
    let hour = addZero(date.getUTCHours());
    let minute = addZero(date.getUTCMinutes());
    return day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
}

function yesterdayTimeStamp() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return dateToTimeStamp(date);
}

function midnightTimeStamp() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
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

function checkOnline(d) {
    var difference_minute = 30;
    var now = new Date(Date.now());
    var h = now.getHours();

    console.log(now.toLocaleString());
    console.log(d);

    if ((now.getFullYear() - d.getFullYear()) === 0) {

        if ((now.getMonth() - d.getMonth()) === 0) {
            if ((now.getDate() - d.getUTCDate()) === 0) {
                if ((now.getHours() - d.getUTCHours()) === 0) {
                    if ((now.getUTCMinutes() - d.getUTCMinutes()) < difference_minute) {
                        return true;
                    }
                } else if ((now.getHours() - d.getUTCHours()) === 1) {
                    if ((now.getUTCMinutes() + (60 - d.getUTCMinutes())) < difference_minute) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

module.exports.dateToTimeStamp = dateToTimeStamp;
module.exports.dateFormatter = dateFormatter;
module.exports.yesterdayTimeStamp = yesterdayTimeStamp;
module.exports.midnightTimeStamp = midnightTimeStamp;
module.exports.hourAgoTimeStamp = hourAgoTimeStamp;
module.exports.checkOnline = checkOnline;
