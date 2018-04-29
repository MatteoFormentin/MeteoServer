var express = require('express');

var setup = function () {

    /*Crea Tabella per la temperatura se non presente*/
    database.query('CREATE TABLE IF NOT EXISTS temperature(\n' +
        '    StationName Varchar(255),\n' +
        '    Val Float,\n' +
        '    Stamp TimeStamp \n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

    database.query('CREATE TABLE IF NOT EXISTS pressure(\n' +
        '    StationName Varchar(255),\n' +
        '    Val Float,\n' +
        '    Stamp TimeStamp \n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });




};

module.exports = setup;
