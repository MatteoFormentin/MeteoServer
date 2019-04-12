var express = require('express');


/*
* First startup database init
*/
module.exports = async function initTables() {
    try {
        await database.asynchQuery('CREATE TABLE IF NOT EXISTS User(\n' +
            '    Id Int NOT NULL AUTO_INCREMENT,\n' +
            '    Email Varchar(255) NOT NULL,\n' +
            '    Name Varchar(255) NOT NULL,\n' +
            '    Password Varchar(255) NOT NULL,\n' +
            '    Admin ENUM(\'true\', \'false\') NOT NULL,\n' +
            '    PRIMARY KEY (Id), \n' +
            '    UNIQUE (Email) \n' +
            ');'
        );

        await database.asynchQuery('CREATE TABLE IF NOT EXISTS Station(\n' +
            '    Id Int NOT NULL AUTO_INCREMENT,\n' +
            '    StationName Varchar(255) NOT NULL,\n' +
            '    Location Varchar(255) NOT NULL,\n' +
            '    Latitude Float NOT NULL,\n' +
            '    Longitude Float NOT NULL,\n' +
            '    Altitude Int NOT NULL,\n' +
            '    Model Varchar(255),\n' +
            '    FirmwareVersion Varchar(5),\n' +
            '    Token Varchar(255), \n' +
            '    LastUpdate DATETIME, \n' +
            '    PRIMARY KEY (Id) \n' +
            ');'
        );

        //Seed default Admin User (You should delete it after initial configuration)
        await database.asynchQuery('SELECT * FROM User').then((rows) => {
            if (rows[0] === undefined) {
                let hash = crypto.createHash('sha256');
                database.query('INSERT INTO User(Email, Name, Password, Admin) VALUES (?, ?, ?, ?)',
                    [
                        'admin@meteoserver.com',
                        'admin',
                        hash.update('password').digest('hex'),
                        true
                    ]
                );
            }
        });

        await database.asynchQuery('CREATE TABLE IF NOT EXISTS Temperature(\n' +
            '    Id Int NOT NULL,\n' +
            '    Val Float,\n' +
            '    Stamp DATETIME, \n' +
            '    FOREIGN KEY (Id) \n' +
            '    REFERENCES Station (Id)\n' +
            '    ON DELETE CASCADE\n' +
            ');'
        );

        await database.asynchQuery('CREATE TABLE IF NOT EXISTS Pressure(\n' +
            '    Id Int NOT NULL,\n' +
            '    Val Float,\n' +
            '    Stamp DATETIME, \n' +
            '    FOREIGN KEY (Id) \n' +
            '    REFERENCES Station (Id)\n' +
            '    ON DELETE CASCADE\n' +
            ');'
        );

        await database.asynchQuery('CREATE TABLE IF NOT EXISTS Humidity(\n' +
            '    Id Int NOT NULL,\n' +
            '    Val Float,\n' +
            '    Stamp DATETIME, \n' +
            '    FOREIGN KEY (Id) \n' +
            '    REFERENCES Station (Id)\n' +
            '    ON DELETE CASCADE\n' +
            ');'
        );

        await database.asynchQuery('CREATE TABLE IF NOT EXISTS Rain(\n' +
            '    Id Int NOT NULL,\n' +
            '    Val Float,\n' +
            '    Stamp DATETIME, \n' +
            '    FOREIGN KEY (Id) \n' +
            '    REFERENCES Station (Id)\n' +
            '    ON DELETE CASCADE\n' +
            ');'
        );

        await database.asynchQuery('CREATE TABLE IF NOT EXISTS Wind(\n' +
            '    Id Int NOT NULL,\n' +
            '    Speed Float,\n' +
            '    Direction Float,\n' +
            '    Stamp DATETIME, \n' +
            '    FOREIGN KEY (Id) \n' +
            '    REFERENCES Station (Id)\n' +
            '    ON DELETE CASCADE\n' +
            ');'
        );

        await database.asynchQuery('CREATE TABLE IF NOT EXISTS Lighting(\n' +
            '    Id Int NOT NULL,\n' +
            '    Distance Float,\n' +
            '    Stamp DATETIME, \n' +
            '    FOREIGN KEY (Id) \n' +
            '    REFERENCES Station (Id)\n' +
            '    ON DELETE CASCADE\n' +
            ');'
        );

        await database.asynchQuery('CREATE TABLE IF NOT EXISTS AirQuality(\n' +
            '    Id Int NOT NULL,\n' +
            '    PM25 Float,\n' +
            '    PM10 Float,\n' +
            '    Stamp DATETIME, \n' +
            '    FOREIGN KEY (Id) \n' +
            '    REFERENCES Station (Id)\n' +
            '    ON DELETE CASCADE\n' +
            ');'
        );

        await database.asynchQuery('CREATE TABLE IF NOT EXISTS FirmwareUpdate(\n' +
            '    Id Int NOT NULL AUTO_INCREMENT, \n' +
            '    Model Varchar(255) NOT NULL, \n' +
            '    Version Varchar(5) NOT NULL, \n' +
            '    FileName Varchar(255) NOT NULL, \n' +
            '    Stamp DATETIME  NOT NULL, \n' +
            '    PRIMARY KEY (Id)\n' +
            ');'
        );
    } catch (err) {
        error.errorHandler(err);
    }
};

