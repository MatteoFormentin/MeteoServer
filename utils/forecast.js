express = require('express');

// ---- 'environment' variables ------------
var z_where = 1;  // Northern = 1 or Southern = 2 hemisphere
var z_baro_top = 1050;	// upper limits of your local 'weather window' (1050.0 hPa for UK)
var z_baro_bottom = 950;	// lower limits of your local 'weather window' (950.0 hPa for UK)
let z_month = new Date().getMonth()
// usage:   forecast = forecast( z_hpa, z_month, z_wind, z_trend [, z_where] [, z_baro_top] [, z_baro_bottom])[0];

// z_hpa is Sea Level Adjusted (Relative) barometer in hPa or mB
// z_month is current month as a number between 1 to 12
// z_wind is English windrose cardinal eg. N, NNW, NW etc.
// NB. if calm a 'nonsense' value should be sent as z_wind (direction) eg. 1 or calm !
// z_trend is barometer trend: 0 = no change, 1= rise, 2 = fall
// z_where - OPTIONAL for posting with form
// z_baro_top - OPTIONAL for posting with form
// z_baro_bottom - OPTIONAL for posting with form
// [0] a short forecast text is returned
// [1] zambretti severity number (0 - 25) is returned ie. forecast() returns a two deep array


//Settled = stabile (sole) Unsettled = instabile (piogge)
var z_forecast = new Array("Settled fine", "Fine weather", "Becoming fine", "Fine, becoming less settled", "Fine, possible showers", "Fairly fine, improving", "Fairly fine, possible showers early", "Fairly fine, showery later", "Showery early, improving", "Changeable, mending", "Fairly fine, showers likely", "Rather unsettled clearing later", "Unsettled, probably improving", "Showery, bright intervals", "Showery, becoming less settled", "Changeable, some rain", "Unsettled, short fine intervals", "Unsettled, rain later", "Unsettled, some rain", "Mostly very unsettled", "Occasional rain, worsening", "Rain at times, very unsettled", "Rain at frequent intervals", "Rain, very unsettled", "Stormy, may improve", "Stormy, much rain");
var z_forecast_italian = new Array("Bel tempo stabile", "Bel tempo", "Bel tempo in arrivo", "Bel tempo, instabile", "Bel tempo, possibili piogge", "Abbastanza bello, in miglioramento", "Abbastanza bello, possibili piogge a breve", "Abbastanza bello, possibili piogge più tardi", "Piogge a breve, poi miglioramento", "Instabile", "Abbastanza bello, possibili piogge", "Piuttosto instabile, schiarite più tardi", "Instabile, possibile miglioramento", "Pioggia alternatata a schiarite", "Piogge, instabile", "Variabile, possibili piogge", "Instabile, brevi periodi di bel tempo", "Instabile, pioggia più tardi", "Instabile, possibili piogge", "Instabile", "Pioggia a tratti, in peggioramento", "Pioggia a tratti, molto instabile", "Pioggia a intervalli ravvicinati", "Pioggia, molto instabile", "Temporale, possibile miglioramento", "Temporale intenso");


// equivalents of Zambretti 'dial window' letters A - Z
var rise_options = new Array(25, 25, 25, 24, 24, 19, 16, 12, 11, 9, 8, 6, 5, 2, 1, 1, 0, 0, 0, 0, 0, 0);
var steady_options = new Array(25, 25, 25, 25, 25, 25, 23, 23, 22, 18, 15, 13, 10, 4, 1, 1, 0, 0, 0, 0, 0, 0);
var fall_options = new Array(25, 25, 25, 25, 25, 25, 25, 25, 23, 23, 21, 20, 17, 14, 7, 3, 1, 1, 1, 0, 0, 0);

// ---- MAIN FUNCTION --------------------------------------------------
function forecast(z_hpa, z_wind, z_trend, z_hemisphere, z_upper, z_lower) {
	var z_test = {
		zambretti_number: -1,
		forecast_phrase: "",
		forecast_phrase_it: ""
	}

	if (z_hemisphere) z_where = z_hemisphere;	// used by input form
	if (z_upper) z_baro_top = z_upper;	// used by input form
	if (z_lower) z_baro_bottom = z_lower; 	// used by input form
	z_range = z_baro_top - z_baro_bottom;
	z_constant = (z_range / 22).toFixed(3);

	z_season = (z_month >= 4 && z_month <= 9); 	// true if 'Summer'
	if (z_where == 1) {  		// North hemisphere
		if (z_wind == "N") {
			z_hpa += 6 / 100 * z_range;
		} else if (z_wind == "NNE") {
			z_hpa += 5 / 100 * z_range;
		} else if (z_wind == "NE") {
			//			z_hpa += 4 ;  
			z_hpa += 5 / 100 * z_range;
		} else if (z_wind == "ENE") {
			z_hpa += 2 / 100 * z_range;
		} else if (z_wind == "E") {
			z_hpa -= 0.5 / 100 * z_range;
		} else if (z_wind == "ESE") {
			//			z_hpa -= 3 ;  
			z_hpa -= 2 / 100 * z_range;
		} else if (z_wind == "SE") {
			z_hpa -= 5 / 100 * z_range;
		} else if (z_wind == "SSE") {
			z_hpa -= 8.5 / 100 * z_range;
		} else if (z_wind == "S") {
			//			z_hpa -= 11 ;  
			z_hpa -= 12 / 100 * z_range;
		} else if (z_wind == "SSW") {
			z_hpa -= 10 / 100 * z_range;  //
		} else if (z_wind == "SW") {
			z_hpa -= 6 / 100 * z_range;
		} else if (z_wind == "WSW") {
			z_hpa -= 4.5 / 100 * z_range;  //
		} else if (z_wind == "W") {
			z_hpa -= 3 / 100 * z_range;
		} else if (z_wind == "WNW") {
			z_hpa -= 0.5 / 100 * z_range;
		} else if (z_wind == "NW") {
			z_hpa += 1.5 / 100 * z_range;
		} else if (z_wind == "NNW") {
			z_hpa += 3 / 100 * z_range;
		}
		if (z_season == 1) {  	// if Summer
			if (z_trend == 1) {  	// rising
				z_hpa += 7 / 100 * z_range;
			} else if (z_trend == 2) {  //	falling
				z_hpa -= 7 / 100 * z_range;
			}
		}
	} else {  	// must be South hemisphere
		if (z_wind == "S") {
			z_hpa += 6 / 100 * z_range;
		} else if (z_wind == "SSW") {
			z_hpa += 5 / 100 * z_range;
		} else if (z_wind == "SW") {
			//			z_hpa += 4 ;  
			z_hpa += 5 / 100 * z_range;
		} else if (z_wind == "WSW") {
			z_hpa += 2 / 100 * z_range;
		} else if (z_wind == "W") {
			z_hpa -= 0.5 / 100 * z_range;
		} else if (z_wind == "WNW") {
			//			z_hpa -= 3 ;  
			z_hpa -= 2 / 100 * z_range;
		} else if (z_wind == "NW") {
			z_hpa -= 5 / 100 * z_range;
		} else if (z_wind == "NNW") {
			z_hpa -= 8.5 / 100 * z_range;
		} else if (z_wind == "N") {
			//			z_hpa -= 11 ;  
			z_hpa -= 12 / 100 * z_range;
		} else if (z_wind == "NNE") {
			z_hpa -= 10 / 100 * z_range;  //
		} else if (z_wind == "NE") {
			z_hpa -= 6 / 100 * z_range;
		} else if (z_wind == "ENE") {
			z_hpa -= 4.5 / 100 * z_range;  //
		} else if (z_wind == "E") {
			z_hpa -= 3 / 100 * z_range;
		} else if (z_wind == "ESE") {
			z_hpa -= 0.5 / 100 * z_range;
		} else if (z_wind == "SE") {
			z_hpa += 1.5 / 100 * z_range;
		} else if (z_wind == "SSE") {
			z_hpa += 3 / 100 * z_range;
		}
		if (z_season == 0) { 	// if Winter
			if (z_trend == 1) {  // rising
				z_hpa += 7 / 100 * z_range;
			} else if (z_trend == 2) {  // falling
				z_hpa -= 7 / 100 * z_range;
			}
		}
	} 	// END North / South

	if (z_hpa == z_baro_top) z_hpa = z_baro_top - 1;
	z_option = Math.floor((z_hpa - z_baro_bottom) / z_constant);
	z_output = "";
	z_output_it = ""
	if (z_option < 0) {
		z_option = 0;
		z_output = "Exceptional Weather, ";
		z_output_it = "Tempo eccezionale, ";
	}
	if (z_option > 21) {
		z_option = 21;
		z_output = "Exceptional Weather, ";
		z_output_it = "Tempo eccezionale, ";
	}

	if (z_trend == 1) { 	// rising
		z_output += z_forecast[rise_options[z_option]];
		z_output_it += z_forecast_italian[rise_options[z_option]]
		z_test.zambretti_number = rise_options[z_option];
	} else if (z_trend == 2) { 	// falling
		z_output += z_forecast[fall_options[z_option]];
		z_output_it += z_forecast_italian[fall_options[z_option]]
		z_test.zambretti_number = fall_options[z_option];
	} else { 	// must be 'steady'
		z_output += z_forecast[steady_options[z_option]];
		z_output_it += z_forecast_italian[steady_options[z_option]]
		z_test.zambretti_number = steady_options[z_option];
	}
	//	return z_output ; 
	z_test.forecast_phrase = z_output;
	z_test.forecast_phrase_it = z_output_it;
	return z_test;
}	// END function   		


module.exports.forecast = forecast;
