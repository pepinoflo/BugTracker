var logger = require('./utils/logger');
var mongoose = require('mongoose');
var server = require('./server');

// Connect to DB and start server
const uriDB = 'mongodb://localhost:27017/bugsdb';
const PORT = 8080;
mongoose.connect(uriDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    logger.info('Connected to Database: ' + uriDB);
    logger.debug('starting server...');
    server.listen(PORT, function() {
        logger.info('server listening on port ' +  PORT);
    });
});
