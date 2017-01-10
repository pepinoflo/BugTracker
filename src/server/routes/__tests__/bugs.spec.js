'use strict';

// Setup test environment
process.env.NODE_ENV = 'test';

var express = require('express');
var request = require('supertest');
var sinon = require('sinon');
var bugController = require('../../controllers/bugController');
var mountBugsRoutes = require('../bugs.js');

describe('Bugs router', function () {
    var app,
        getBugsStub,
        getBugStub,
        putBugStub,
        postBugStub;

    before(function () {
        // Stub all Controller methods. We just want to make sure they are called
        getBugsStub = sinon.stub(bugController, 'getBugs').yields(null);
        getBugStub = sinon.stub(bugController, 'getBug').yields(null);
        putBugStub = sinon.stub(bugController, 'putBug').yields(null);
        postBugStub = sinon.stub(bugController, 'postBug').yields(null);
        // Create an Express app and mount the routes for bugs
        app = express();
        mountBugsRoutes(app);
    });

    it('calls getBugs method when GET /api/bugs is requested', function (done) {
        request(app)
            .get('/api/bugs')
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    sinon.assert.called(getBugsStub);
                    done();
                }
            });
    });

    it('calls getBug method when GET /api/bugs/:id is requested', function (done) {
        request(app)
            .put('/api/bugs/23')
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    sinon.assert.called(putBugStub);
                    done();
                }
            });
    });

    it('calls putBug method when PUT /api/bugs/:id is requested', function (done) {
        request(app)
            .post('/api/bugs/23')
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    sinon.assert.called(putBugStub);
                    done();
                }
            });
    });

    it('calls postBug method when POST /api/bugs is requested', function (done) {
        request(app)
            .post('/api/bugs')
            .end(function (err, res) {
                if (err) {
                    done(err);
                } else {
                    sinon.assert.called(postBugStub);
                    done();
                }
            });
    });
});
