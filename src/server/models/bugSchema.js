'use strict';

var mongoose = require('mongoose');

var bugSchema = new mongoose.Schema({
    title: {type: String, required: true},
    priority: {type: String},
    owner: {type: String},
    status: {type: String, required: true}
});

module.exports = mongoose.model('Bug', bugSchema);
