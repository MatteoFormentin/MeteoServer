var express = require('express');

var setup_db = function () {
    /*Crea Tabelle se non presenti*/

    database.query('CREATE TABLE IF NOT EXISTS Station(\n' +
        '    Id Int NOT NULL AUTO_INCREMENT,\n' +
        '    StationName Varchar(255),\n' +
        '    Location Varchar(255),\n' +
        '    IP Varchar(255), \n' +
        '    Token Varchar(255), \n' +
        '    PRIMARY KEY (Id) \n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

    database.query('CREATE TABLE IF NOT EXISTS Temperature(\n' +
        '    Id Int NOT NULL,\n' + //Identificativo stazione FOREIGN KEY
        '    Val Float,\n' +
        '    Stamp TimeStamp, \n' +
        '    FOREIGN KEY (Id) \n' +
        '    REFERENCES Station (Id)\n' +
        '    ON DELETE CASCADE\n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

    database.query('CREATE TABLE IF NOT EXISTS Pressure(\n' +
        '    Id Int NOT NULL,\n' + //Identificativo stazione FOREIGN KEY
        '    Val Float,\n' +
        '    Stamp TimeStamp, \n' +
        '    FOREIGN KEY (Id) \n' +
        '    REFERENCES Station (Id)\n' +
        '    ON DELETE CASCADE\n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

    database.query('CREATE TABLE IF NOT EXISTS Pressure(\n' +
        '    Id Int NOT NULL,\n' + //Identificativo stazione FOREIGN KEY
        '    Val Float,\n' +
        '    Stamp TimeStamp, \n' +
        '    FOREIGN KEY (Id) \n' +
        '    REFERENCES Station (Id)\n' +
        '    ON DELETE CASCADE\n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

    database.query('CREATE TABLE IF NOT EXISTS Humidity(\n' +
        '    Id Int NOT NULL,\n' + //Identificativo stazione FOREIGN KEY
        '    Val Float,\n' +
        '    Stamp TimeStamp, \n' +
        '    FOREIGN KEY (Id) \n' +
        '    REFERENCES Station (Id)\n' +
        '    ON DELETE CASCADE\n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

    database.query('CREATE TABLE IF NOT EXISTS Rain(\n' +
        '    Id Int NOT NULL,\n' + //Identificativo stazione FOREIGN KEY
        '    Val Float,\n' +
        '    Stamp TimeStamp, \n' +
        '    FOREIGN KEY (Id) \n' +
        '    REFERENCES Station (Id)\n' +
        '    ON DELETE CASCADE\n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

};

module.exports = setup_db;
