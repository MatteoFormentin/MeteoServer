express = require('express');
forecast = require('./forecast');

module.exports = Object.assign({}, 
    seaLevelPressure, 
    dewPoint,
    humidex,
    windchill,
    degToCardinal,
    calcBarometerDifference, 
    forecast);



function seaLevelPressure(pressure, altitude) {
    return Math.round(pressure + (altitude / 8) * 100) / 100; //mbar/hpa
}

//Punto di Rugiada
function dewPoint(temperature, humidity) {
    let pres_vap_sat = 6.11 * Math.pow(10, (7.5 * temperature) / (237.7 + temperature));
    let pres_vap_eff = (humidity * pres_vap_sat) / 100;
    let dew_point = (-430.22 + 237.7 * Math.log(pres_vap_eff)) / (-Math.log(pres_vap_eff) + 19.08);
    return Math.round(dew_point * 10) / 10;
}

//Temperatura percepita
function humidex(temperature, humidity) {
    if (temperature < 21 || humidity < 20) return temperature;
    let humidex = temperature + 0.5555 * (6.112 * humidity / 100 * Math.pow(10, ((7.5 * temperature) / (237.7 + temperature))) - 10);
    return Math.round(humidex * 10) / 10;
}

//Temperatura percepita a causa del vento
function windchill(temperature, wind) {
    wind *= 3.6; //Km/h -> m/s
    if (temperature <= 10 || !(wind <= 25 && wind >= 1.78)) return temperature;
    let windchill = (0.45 * Math.pow(wind, 0.5) + 0.47 - wind)*(temperature - 33) + 33;
    return Math.round(windchill * 10) / 10;
}

function degToCardinal(direction) {
    if (direction < 22.5) return "N";
    if (direction < 45) return "NNE";
    if (direction < 67.5) return "NE";
    if (direction < 90) return "ENE";
    if (direction < 112.5) return "E";
    if (direction < 135) return "ESE";
    if (direction < 157.5) return "SE";
    if (direction < 180) return "SSE";
    if (direction < 202.5) return "S";
    if (direction < 225) return "SSO";
    if (direction < 247.5) return "SO";
    if (direction < 270) return "OSO";
    if (direction < 292.5) return "O";
    if (direction < 315) return "ONO";
    if (direction < 337.5) return "NO";
    if (direction < 360) return "NNO";
}

function calcBarometerDifference(val) {
    //if (!val.isArray()) return 0;
    if (val.length === 1) return 0;
    let curr;
    let prec = 0;
    let difference = 0;
    for (let i = 0; i < val.length; i++) {
        curr = val[i];
        if (i !== 0) {
            difference += curr - prec;
        }
        prec = curr;
    }
    return difference;
}


module.exports.seaLevelPressure = seaLevelPressure;
module.exports.dewPoint = dewPoint;
module.exports.humidex = humidex;
module.exports.windchill = windchill;
module.exports.degToCardinal = degToCardinal;
module.exports.calcBarometerDifference = calcBarometerDifference;


/*
if (0 <= direction < 22.5) return "N";
    if (22.5 <= direction < 45) return "NNE";
    if (45 <= direction < 67.5) return "NE";
    if (67.5 <= direction < 90) return "ENE";
    if (90 <= direction < 112.5) return "E";
    if (112.5 <= direction < 135) return "ESE";
    if (135 <= direction < 157.5) return "SE";
    if (157.5 <= direction < 180) return "SSE";
    if (180 <= direction < 202.5) return "S";
    if (202.5 <= direction < 225) return "SSO";
    if (225 <= direction < 247.5) return "SO";
    if (247.5 <= direction < 270) return "OSO";
    if (270 <= direction < 292.5) return "O";
    if (292.5 <= direction < 315) return "ONO";
    if (315 <= direction < 337.5) return "NO";
    if (337.5 <= direction < 0) return "NNO";
 */

