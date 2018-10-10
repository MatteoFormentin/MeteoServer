var express = require('express');
var router = express.Router();

/* GET history page. */
router.get('/', isAuthenticated, function (req, res, next) {
        var data = {station: 0, temperature: 0, pressure: 0, humidity: 0, rain: 0, lighting: 0, wind: 0}; //Conterrà object rows

        var data_chart = {
            temperature: {val: [], stamp: []},
            pressure: {val: [], stamp: []},
            humidity: {val: [], stamp: []},
            rain: {val: [], stamp: []},
            lighting: {distance: [], stamp: []},
            wind: {speed: [], direction: [], stamp: []}
        };

        var selected_id = 0; //0-All, 1,2,.. Stazioni
        var selected_station = 0;

        var date_start;
        var date_end;


        var station_query = 'SELECT * FROM Station';

        var temp_query = 'SELECT * FROM Temperature INNER JOIN Station ON Temperature.Id = Station.Id';
        var pres_query = 'SELECT * FROM Pressure INNER JOIN Station ON Pressure.Id = Station.Id';
        var hum_query = 'SELECT * FROM Humidity INNER JOIN Station ON Humidity.Id = Station.Id';
        var rain_query = 'SELECT * FROM Rain INNER JOIN Station ON Rain.Id = Station.Id';
        var wind_query = 'SELECT * FROM Wind INNER JOIN Station ON Wind.Id = Station.Id';
        var lighting_query = 'SELECT * FROM Lighting INNER JOIN Station ON Lighting.Id = Station.Id';


        if (!(req.query.station === undefined) && !(req.query.station === '0')) {
            selected_id = req.query.station;
            temp_query += ' WHERE Station.Id= \'' + selected_id + '\'';
            pres_query += ' WHERE Station.Id= \'' + selected_id + '\'';
            hum_query += ' WHERE Station.Id= \'' + selected_id + '\'';
            rain_query += ' WHERE Station.Id= \'' + selected_id + '\'';
            wind_query += ' WHERE Station.Id= \'' + selected_id + '\'';
            lighting_query += ' WHERE Station.Id= \'' + selected_id + '\'';

            if (req.query.date_start === '') {
                let time_stamp = dateConvert.yesterdayTimeStamp();
                date_start = time_stamp;

                temp_query += ' AND Stamp BETWEEN \'' + time_stamp + '\'';
                pres_query += ' AND Stamp BETWEEN \'' + time_stamp + '\'';
                hum_query += ' AND Stamp BETWEEN \'' + time_stamp + '\'';
                rain_query += ' AND Stamp BETWEEN \'' + time_stamp + '\'';
                wind_query += ' AND Stamp BETWEEN \'' + time_stamp + '\'';
                lighting_query += ' AND Stamp BETWEEN \'' + time_stamp + '\'';
            }
            else {
                date_start = req.query.date_start.toString();
                temp_query += ' AND Stamp BETWEEN \'' + req.query.date_start + '\'';
                pres_query += ' AND Stamp BETWEEN \'' + req.query.date_start + '\'';
                hum_query += ' AND Stamp BETWEEN \'' + req.query.date_start + '\'';
                rain_query += ' AND Stamp BETWEEN \'' + req.query.date_start + '\'';
                wind_query += ' AND Stamp BETWEEN \'' + req.query.date_start + '\'';
                lighting_query += ' AND Stamp BETWEEN \'' + req.query.date_start + '\'';
            }

            if (req.query.date_end === '') {
                let date = new Date();
                let time_stamp = dateConvert.dateToTimeStamp(date);
                date_end = time_stamp;
                temp_query += ' AND \'' + time_stamp + '\'';
                pres_query += ' AND \'' + time_stamp + '\'';
                hum_query += ' AND \'' + time_stamp + '\'';
                rain_query += ' AND \'' + time_stamp + '\'';
                wind_query += ' AND \'' + time_stamp + '\'';
                lighting_query += ' AND \'' + time_stamp + '\'';
            }
            else {
                date_end = req.query.date_end.toString();
                temp_query += ' AND \'' + req.query.date_end + '\'';
                pres_query += ' AND \'' + req.query.date_end + '\'';
                hum_query += ' AND \'' + req.query.date_end + '\'';
                rain_query += ' AND \'' + req.query.date_end + '\'';
                wind_query += ' AND \'' + req.query.date_end + '\'';
                lighting_query += ' AND \'' + req.query.date_end + '\'';
            }

            temp_query += ' ORDER BY Stamp ASC';
            pres_query += ' ORDER BY Stamp ASC';
            hum_query += ' ORDER BY Stamp ASC';
            rain_query += ' ORDER BY Stamp ASC';
            wind_query += ' ORDER BY Stamp ASC';
            lighting_query += ' ORDER BY Stamp ASC';

            database.query(station_query, function (err, rows) {
                    if (err) throw err;
                    data.station = rows; //Elenco stazioni per menu selezione

                    //Cerco la stazione attualmente selezionata
                    database.query('SELECT * FROM Station WHERE Id= \'' + selected_id + '\'', function (err, rows) {
                        selected_station = rows[0];

                        database.query(temp_query, function (err, rows) {
                            if (err) throw err;
                            if (req.query.type === "0") {
                                for (item of rows) {
                                    data_chart.temperature.val.push(item.Val);
                                    data_chart.temperature.stamp.push(dateConvert.dateFormatter(item.Stamp));
                                }
                            } else if (req.query.type === "1") {
                                data.temperature = rows;
                            }

                            database.query(pres_query, function (err, rows) {
                                if (err) throw err;
                                if (req.query.type === "0") {
                                    for (item of rows) {
                                        data_chart.pressure.val.push(meteoUtils.seaLevelPressure(parseInt(item.Val), parseInt(selected_station.Altitude)) / 100);
                                        data_chart.pressure.stamp.push(dateConvert.dateFormatter(item.Stamp));
                                    }
                                } else if (req.query.type === "1") {
                                    data.pressure = rows;
                                }

                                database.query(hum_query, function (err, rows) {
                                    if (err) throw err;
                                    if (req.query.type === "0") {
                                        for (item of rows) {
                                            data_chart.humidity.val.push(item.Val);
                                            data_chart.humidity.stamp.push(dateConvert.dateFormatter(item.Stamp));
                                        }
                                    } else if (req.query.type === "1") {
                                        data.humidity = rows;
                                    }

                                    database.query(rain_query, function (err, rows) {
                                        if (err) throw err;
                                        if (req.query.type === "0") {
                                            for (item of rows) {
                                                data_chart.rain.val.push(item.Val);
                                                data_chart.rain.stamp.push(dateConvert.dateFormatter(item.Stamp));
                                            }
                                        } else if (req.query.type === "1") {
                                            data.rain = rows;
                                        }

                                        database.query(lighting_query, function (err, rows) {
                                            if (err) throw err;
                                            if (req.query.type === "0") {
                                                for (item of rows) {
                                                    data_chart.lighting.distance.push(item.Distance);
                                                    data_chart.lighting.stamp.push(dateConvert.dateFormatter(item.Stamp));
                                                }
                                            } else if (req.query.type === "1") {
                                                data.lighting = rows;
                                            }

                                            console.log(rows);

                                            database.query(wind_query, function (err, rows) {
                                                if (err) throw err;
                                                if (req.query.type === "0") {
                                                    for (item of rows) {
                                                        data_chart.wind.speed.push(item.Speed);
                                                        data_chart.wind.direction.push(item.Direction);
                                                        data_chart.wind.stamp.push(dateConvert.dateFormatter(item.Stamp));
                                                    }
                                                } else if (req.query.type === "1") {
                                                    data.wind = rows;
                                                }

                                                //RENDER VIEW
                                                if (req.query.type === "0") {
                                                    res.render('history/chart', {
                                                        title: 'Meteo Server',
                                                        logged_user: req.user,
                                                        selected_station: selected_station,
                                                        type: 0,
                                                        data: data,
                                                        data_chart: data_chart,
                                                        date_start: date_start,
                                                        date_end: date_end
                                                    });
                                                }
                                                else if (req.query.type === "1") {
                                                    res.render('history/table', {
                                                        title: 'Meteo Server',
                                                        logged_user: req.user,
                                                        selected_station: selected_station,
                                                        type: 1,
                                                        data: data,
                                                        data_chart: data_chart,
                                                        date_start: date_start,
                                                        date_end: date_end
                                                    });
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            );
        }

//Se non è selezionata una stazione non visualizzare niente
        else {
            database.query(station_query, function (err, rows) {
                if (err) throw err;
                data.station = rows; //Elenco stazioni per menu selezione
                res.render('history/history', {
                    title: 'Meteo Server',
                    logged_user: req.user,
                    message: req.flash(),
                    selected_station: {StationName: "seleziona...", Location: "seleziona..."},
                    data: data,
                    data_chart: data_chart,
                    date_start: '',
                    date_end: ''
                });
            });
        }
    }
);

module.exports = router;
