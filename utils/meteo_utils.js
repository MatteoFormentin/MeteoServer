express = require('express');


function seaLevelPressure(pressure, altitude) {
    console.log(pressure + (altitude / 8) * 100);
    return pressure + (altitude / 8) * 100;
}

function dewPoint(temperature, humidity) {

    let pres_vap_sat = 6.11 * Math.pow(10, (7.5 * temperature) / (237.7 + temperature));
    let pres_vap_eff = (humidity * pres_vap_sat) / 100;
    let dew_point = (-430.22 + 237.7 * Math.log(pres_vap_eff)) / (-Math.log(pres_vap_eff) + 19.08);

    console.log(dew_point);
    return Math.round(dew_point * 10) / 10;
}

function humidex(temperature, humidity) {

    let humidex = temperature + (0.5555 * (0.06 * humidity * Math.pow(10, (0.03 * temperature)) - 10));

    console.log(humidex);
    return Math.round(humidex * 10) / 10;
}


module.exports.seaLevelPressure = seaLevelPressure;
module.exports.dewPoint = dewPoint;
module.exports.humidex = humidex;
