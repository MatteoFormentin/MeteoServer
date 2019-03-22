var express = require('express');

/*
 *  Database data are UTC 
 */

function dateToTimeStamp(date, utc = true) {
    if (!(date instanceof Date)) return "N/A";
    let year = addZero(utc ? date.getUTCFullYear() : date.getFullYear());
    let month = addZero((utc ? date.getUTCMonth() : date.getMonth()) + 1);
    let day = addZero(utc ? date.getUTCDate() : date.getDate());
    let hour = addZero(utc ? date.getUTCHours() : date.getHours());
    let minute = addZero(utc ? date.getUTCMinutes() : date.getMinutes());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

//diff from the first because it adds seconds
function dateToTimeStampSecond(date) { //NB: Essendo creata per convertire timestamp sql in timestamp sql utilizzo le ore in UTC
    if (!(date instanceof Date)) return "N/A";
    let year = date.getUTCFullYear();
    let month = addZero(date.getUTCMonth() + 1);
    let day = addZero(date.getUTCDate());
    let hour = addZero(date.getUTCHours());
    let minute = addZero(date.getUTCMinutes());
    let second = addZero(date.getUTCSeconds());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

/*
 * Convert UTC timestamp to local time in a readable format (dd/mm/yyyy hh:mm)
 */
function timestampToDate(stamp, utc = true) {
    let date = new Date(Date.parse(stamp + (utc ? " GMT" : "")));
    return dateFormatter(date);
}

function dateFormatter(date) {
    if (!(date instanceof Date)) return "N/A";
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hour = addZero(date.getHours());
    let minute = addZero(date.getMinutes());
    return day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
}

function yesterdayTimeStamp() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return dateToTimeStamp(date);
}

function midnightTimeStamp(utc = true) {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    if (utc) return dateToTimeStamp(date);
    else return dateToTimeStamp(date, false)
}

function hourAgoTimeStamp(ago, utc = true) {
    let date = new Date();
    date.setHours(date.getHours() - ago);
    if (utc) return dateToTimeStamp(date);
    else return dateToTimeStamp(date, false)
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
    var date = d.split(' ')[0];
    var time = d.split(' ')[1];

    var day = date.split('/')[0];
    var month = date.split('/')[1];
    var year = date.split('/')[2];

    var hour = time.split(':')[0];
    var minute = time.split(':')[1];

    d = new Date(year, month, day, hour, minute);

    var difference_minute = 30;
    var difference_milliseconds = difference_minute * 60 * 1000;
    var now = new Date(Date.now());
    return (now.getTime() - d.getTime()) < difference_milliseconds;
}

module.exports.dateToTimeStamp = dateToTimeStamp;
module.exports.dateToTimeStampSecond = dateToTimeStampSecond;
module.exports.timestampToDate = timestampToDate;
module.exports.dateFormatter = dateFormatter;
module.exports.yesterdayTimeStamp = yesterdayTimeStamp;
module.exports.midnightTimeStamp = midnightTimeStamp;
module.exports.hourAgoTimeStamp = hourAgoTimeStamp;
module.exports.checkOnline = checkOnline;
