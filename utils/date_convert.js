var express = require('express');

/*
 * NB1: getUTC return greenwich time, get return current UTC(+2) time
 * NB2: Le date create dal timestamp database sono già in UTC+2 e vanno gestite con le funzioni standard (come se fossimo a UTC 0).
 *  Le date create con date.setNow() vanno gestite con le funzioni getUTC--() essendo riferite a UTC 0
 */

function dateToTimeStamp(date) {
    if (!(date instanceof Date)) return "N/A";
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hour = addZero(date.getHours());
    let minute = addZero(date.getMinutes());
    console.log(year + '-' + month + '-' + day + ' ' + hour + ':' + minute);
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

function dateToTimeStampSecond(date) { //NB: Essendo creata per convertire  timestamp sql in timestamp sql utilizzo le ore in UTC
    if (!(date instanceof Date)) return "N/A";
    let year = date.getUTCFullYear();
    let month = addZero(date.getUTCMonth() + 1);
    let day = addZero(date.getUTCDate());
    let hour = addZero(date.getUTCHours());
    let minute = addZero(date.getUTCMinutes());
    let second = addZero(date.getUTCSeconds());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

function dateFormatter(date) {
    if (!(date instanceof Date)) return "N/A";
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

/*
function checkOnline(d) {
    if (!(d instanceof Date)) return false;
    var difference_minute = 30;
    var now = new Date(Date.now());

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
}*/

function checkOnline(d) {
    if (!(d instanceof Date)) return false;
    var difference_minute = 30;
    var difference_milliseconds = difference_minute * 60 * 1000;
    var now = new Date(Date.now());
    return now.getTime() - d.getTime() < difference_milliseconds;
}

module.exports.dateToTimeStamp = dateToTimeStamp;
module.exports.dateToTimeStampSecond = dateToTimeStampSecond;
module.exports.dateFormatter = dateFormatter;
module.exports.yesterdayTimeStamp = yesterdayTimeStamp;
module.exports.midnightTimeStamp = midnightTimeStamp;
module.exports.hourAgoTimeStamp = hourAgoTimeStamp;
module.exports.checkOnline = checkOnline;
