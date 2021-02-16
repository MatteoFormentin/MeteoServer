const winston = require('winston');

logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error', timestamp: true }),
        new winston.transports.File({ filename: 'combined.log', timestamp: true })
    ]
});

//For container useful to log on console
logger.add(new winston.transports.Console({
    format: winston.format.simple(),
    timestamp: true,
    colorized: true
}));


module.exports = logger