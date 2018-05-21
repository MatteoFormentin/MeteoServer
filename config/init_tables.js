var express = require('express');

module.exports = function initTables() {
    /*Crea Tabelle se non presenti*/

    database.query('CREATE TABLE IF NOT EXISTS User(\n' +
        '    Id Int NOT NULL AUTO_INCREMENT,\n' +
        '    Email Varchar(255) NOT NULL,\n' +
        '    Name Varchar(255) NOT NULL,\n' +
        '    Password Varchar(255) NOT NULL,\n' +
        '    PRIMARY KEY (Id), \n' +
        '    UNIQUE (Email) \n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

    database.query('CREATE TABLE IF NOT EXISTS Station(\n' +
        '    Id Int NOT NULL AUTO_INCREMENT,\n' +
        '    StationName Varchar(255) NOT NULL,\n' +
        '    Location Varchar(255) NOT NULL,\n' +
        '    Altitude Int NOT NULL,\n' +
        '    IP Varchar(255), \n' +
        '    Token Varchar(255), \n' +
        '    PRIMARY KEY (Id) \n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

    /*
    //SEED FIRST START ONLY
    database.query('INSERT INTO User(Email, Name, Password) VALUES (' +
        '\'admin@meteoserver.com\', ' +
        '\'admin\', ' +
        '\'password\');'
        , function (err, rows, fields) {
            if (err) throw err;
        });
    */

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

    database.query('CREATE TABLE IF NOT EXISTS Wind(\n' +
        '    Id Int NOT NULL,\n' + //Identificativo stazione FOREIGN KEY
        '    Speed Float,\n' +
        '    Direction Float,\n' +
        '    Stamp TimeStamp, \n' +
        '    FOREIGN KEY (Id) \n' +
        '    REFERENCES Station (Id)\n' +
        '    ON DELETE CASCADE\n' +
        ');', function (err, rows, fields) {
        if (err) throw err;
    });

};

