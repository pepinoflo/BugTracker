var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
        transports: [
            new winston.transports.File({
                level: 'info',
                filename: 'logs/all-logs.log',
                handleExceptions: true,
                json: true,
                maxsize: 5242880, //5MB
                maxFiles: 5,
                colorize: false
            })
        ],
        exitOnError: false
    });

if (process.env.NODE_ENV !== 'test') {
    logger.add(winston.transports.Console, {
        prettyPrint: true,
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    });
};

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
