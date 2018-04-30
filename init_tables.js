var express = require('express');

var setup = function () {
    database.query('CREATE TABLE IF NOT EXISTS station(\n' +
        '    StationName Varchar(255),\n' +
        '    Location Varchar(255),\n' +
        '    Token Varchar(255), \n' +
        'PRIMARY KEY (StationName) \n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

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
