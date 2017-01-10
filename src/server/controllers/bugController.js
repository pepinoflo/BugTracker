'use strict';

var logger = require('../utils/logger');
var Bug = require('../models/BugSchema');
var mongoose = require('mongoose');

var bugController = {
    getBugs: function (req, res) {
        logger.debug('bugController.getBugs called');
        // Create the filter using the query
        var filter = {};
        if (req.query.status) {
            filter.status = req.query.status;
        }
        if (req.query.priority) {
            filter.priority = req.query.priority;
        }
        // Get bugs matching the filter from DB and send the list back
        Bug.find(filter, function (err, bugs) {
            if (err) {
                logger.error('could not find bugs - ' + err);
                res.send('could not find bugs - ' + err);
            } else {
                logger.info('Bugs found: ' + bugs);
                res.json(bugs);
            }
        });
    },

    getBug: function (req, res) {
        // Find mongoose Id
        const id = new mongoose.mongo.ObjectId(req.params.id);
        // Get the bug matching the Id in the DB and send it back
        Bug.findOne({_id: id}, function (err, bug) {
            if (err) {
                logger.error('could not find bug ' + id + ' - ' + err);
                res.send('could not find bug ' + id + ' - ' + err);
            } else {
                logger.info('Bug ' + id + ' found: ' + bug);
                res.json(bug);
            }
        });
    },

    putBug: function(req, res) {
        // Find mongoose Id
        const id = new mongoose.mongo.ObjectId(req.params.id);
        // Get the bug matching the Id in the DB and update it with the request body
        Bug.findOneAndUpdate({_id: id}, req.body, {new: true}, function (err, bug) {
            if (err) {
                logger.error('could not find bug ' + id + ' - ' + err);
                res.send('could not find bug ' + id + ' - ' + err);
            } else {
                logger.info('Bug ' + id + ' updated to: ' + bug);
                res.json(bug);
            }
        });
    },

    postBug: function (req, res) {
        // Create a new bug using the request body
        var newBug = new Bug(req.body);
        // Save the new bug in the DB and send it back
        newBug.save(function (err, savedBug) {
            if (err) {
                logger.error('could not save bug - ' + err);
                res.send('Could not save bug - ' + err);
            } else {
                logger.info('Bug successfully saved: ' + savedBug);
                res.json(savedBug);
            }
        });
    }
};

module.exports = bugController;
