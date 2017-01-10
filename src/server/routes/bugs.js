'use strict';

var logger = require('../utils/logger');
var express = require('express');
var bugController = require('../controllers/bugController.js');

var mountBugsRoutes = function (app) {
    // Create a router and mount it on the app
    var router = express.Router();
    app.use('/api/bugs', router);

    // Create necessary routes redirecting to the appropriate controller
    router.get('/', bugController.getBugs);
    router.get('/:id', bugController.getBug);
    router.put('/:id', bugController.putBug);
    router.post('/', bugController.postBug);
    logger.info('Bugs routes mounted');
}

module.exports = mountBugsRoutes;
