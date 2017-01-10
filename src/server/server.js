// Library imports
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mountBugsRoutes = require('./routes/bugs');

//Global variable
var GLOBAL = {};
GLOBAL.rootDir = '/Users/florent/IT/Dev/BugTracker/';

// The app and routes
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

mountBugsRoutes(app);

// The default route
app.get('*', function (req, res) {
    res.sendFile(path.resolve(GLOBAL.rootDir, 'public', 'index.html'));
});

module.exports = app;
