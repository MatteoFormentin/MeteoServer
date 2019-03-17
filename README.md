# Meteo Server  
Node.js and MySQL based weather station data logger and analyzer.  

### FEAUTURES:
- Multiple weather station management
- Simple data acquisition based on json http post with auth token
- Hystorical data views either in tab form or as chart
- Temperature, humidity, pressure, rain, wind, and lighting can be logged 
- OpenstretMap view of each weather station

Please note that text language is italian.

## SETUP:  
Create a new db and user and modify db_config.json file:

```
{
  "host": "server ip",
  "database": "db name",
  "user": "username",
  "password": "password"
}
```
Then run
```
npm install
```
and 
```
   npm start
```

## LICENSE  
All software is released under MIT License.

*Copyright (c) 2019 Matteo Formentin*

