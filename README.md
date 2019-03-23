# Meteo Server

Node.js and MySQL based weather station data logger and analyzer.  

## FEAUTURES

- Multiple weather station management web-based
- Temperature, humidity, pressure, rain, wind, and lighting can be logged
- Simple data acquisition based on json http post with auth token
- Hystorical data views either in tab form or as chart
- OpenstretMap view of each weather station  
- API to connect with other product (Check MeteoDisplay repo)
- User auth to lock access to web page
- Weather forecast using Zambretti algorithm

Please note that text language is italian.

## SETUP

Create a new db (MySQL) and modify db_config.json file:

```json
{
  "host": "server ip",
  "database": "db name",
  "user": "username",
  "password": "password"
}
```

Then run

```bash
npm install
```

and

```bash
npm start
```

## DOCUMENTATION

Check the Wiki for doc and API description.  

## LICENSE

All software is released under MIT License.

*Copyright (c) 2019 Matteo Formentin*