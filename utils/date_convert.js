var express = require('express');


function dateToTimeStamp(date) {
    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    //console.log(year + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes());
    return year + '-' + month + '-' + day + ' ' + date.getHours() + ':' + date.getMinutes();
}

function addZero(d) {
    if (d.toString().length < 2) {
        return '0' + d;
    }
    else return d;
}

module.exports.dateToTimeStamp = dateToTimeStamp;
