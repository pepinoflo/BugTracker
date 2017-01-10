'use strict';

// Setup test environment
process.env.NODE_ENV = 'test';

var sinon = require('sinon');
var Bug = require('../../models/BugSchema');
var bugController = require('../bugController');
var mongoose = require('mongoose');
var expect = require('chai').expect;
var proxyquire = require('proxyquire');

describe('getBugs', function () {
    var bugsData;

    beforeEach(function () {
        // Stub find method
        sinon.stub(Bug, 'find');
        bugsData = [{name: 'bug1'}, {name: 'bug2'}];
        Bug.find.yields(null, bugsData);
    });

    it('sets the status in the filter', sinon.test(function (done) {
        var filter,
            req,
            res;
        // Create the filter and request. Stub the response
        filter = {
            status: "New"
        };
        req = {
            query: filter
        };
        res = {json: this.stub()};
        bugController.getBugs(req, res);
        sinon.assert.calledWith(Bug.find, filter);
        done();
    }));

    it('sets the priority in the filter', sinon.test(function (done) {
        var filter,
            req,
            res;
        // Create the filter and request. Stub the response
        filter = {
            priority: "P1"
        };
        req = {
            query: filter
        };
        res = {json: this.stub()};
        bugController.getBugs(req, res);
        sinon.assert.calledWith(Bug.find, filter);
        done();
    }));

    it('sets the status and priority in the filter', sinon.test(function (done) {
        var filter,
            req,
            res;
        // Create the filter and request. Stub the response
        filter = {
            status: "New",
            priority: "P1"
        };
        req = {
            query: filter
        };
        res = {json: this.stub()};
        bugController.getBugs(req, res);
        sinon.assert.calledWith(Bug.find, filter);
        done();
    }));

    it('responds with list of bugs', sinon.test(function (done) {
        var req,
            res;
        req = {query: {}};
        res = {json: this.stub()};
        bugController.getBugs(req, res);
        sinon.assert.calledWith(res.json, bugsData);
        done();
    }));

    it('sends an error message when error', sinon.test(function (done) {
        var req,
            res;
        req = {query: {}};
        res = {send: this.stub()};
        // Modify the stub to send an error
        Bug.find.yields("error cause", null);

        bugController.getBugs(req, res);
        sinon.assert.calledWith(res.send, 'could not find bugs - error cause');
        done();
    }));

    afterEach(function () {
        Bug.find.restore();
    });
});

describe('getBug', function () {
    var bugData, id;

    beforeEach(function () {
        // Stub findOne method
        sinon.stub(Bug, 'findOne');
        bugData = {name: 'bug1'};
        Bug.findOne.yields(null, bugData);
        id = 1;
    });

    it('calls findOne', sinon.test(function (done) {
        var req,
            res;
        req = {params: {
            id: id
        }};
        res = {json: this.stub()};
        bugController.getBug(req, res);
        sinon.assert.calledWith(Bug.findOne);
        done();
    }));

    it('responds with the bug', sinon.test(function (done) {
        var req,
            res;
        req = {params: {
            id: id
        }};
        res = {json: this.stub()};
        bugController.getBug(req, res);
        sinon.assert.calledWith(res.json, bugData);
        done();
    }));

    it('sends an error message when error', sinon.test(function (done) {
        var req,
            res;
        req = {params: {
            id: id
        }};
        res = {send: this.stub()};
        // Modify the stub to yield an error
        Bug.findOne.yields("error cause", null);

        bugController.getBug(req, res);
        sinon.assert.calledWith(res.send);
        done();
    }));

    afterEach(function () {
        Bug.findOne.restore();
    });
});

describe('putBug', function () {
    var bugData, id;

    beforeEach(function () {
        // Stub findOneAndUpdate method
        sinon.stub(Bug, 'findOneAndUpdate');
        bugData = {name: 'bug1'};
        Bug.findOneAndUpdate.yields(null, bugData);
        id = 1;
    });

    it('calls findOneAndUpdate', sinon.test(function (done) {
        var req,
            res;
        req = {params: {
            id: id
        }};
        res = {json: this.stub()};
        bugController.putBug(req, res);
        sinon.assert.calledWith(Bug.findOneAndUpdate);
        done();
    }));

    it('responds with the bug', sinon.test(function (done) {
        var req,
            res;
        req = {params: {
            id: id
        }};
        res = {json: this.stub()};
        bugController.putBug(req, res);
        sinon.assert.calledWith(res.json, bugData);
        done();
    }));

    it('sends an error message when error', sinon.test(function (done) {
        var req,
            res;
        req = {params: {
            id: id
        }};
        res = {send: this.stub()};
        // Modify the stub to yield an error
        Bug.findOneAndUpdate.yields("error cause", null);

        bugController.putBug(req, res);
        sinon.assert.calledWith(res.send);
        done();
    }));

    afterEach(function () {
        Bug.findOneAndUpdate.restore();
    });
});

describe('postBug', function () {
    var bugStub, bugControllerProxy, bugData;

    beforeEach(function(){
        // Create a fake bug
        bugData = {
            title: 'bug',
            status: 'New'
        };
        // Stub the Bug model loaded by bugController
        bugStub = sinon.stub();
        bugControllerProxy = proxyquire('../bugController', {
                '../models/BugSchema' : bugStub
        });
    });

    it('calls res.json with saved bug', sinon.test(function (done) {
        var req,
            res;
        req = {body: bugData};
        res = {json: this.stub()};
        // Stub the save method of the Bug model stub to return bugData
        bugStub.prototype.save = sinon.stub().yields(null, bugData);
        bugControllerProxy.postBug(req, res);
        sinon.assert.calledWith(res.json, bugData);
        done();
    }));

    it('calls res.send when there is an error', sinon.test(function (done) {
        var req,
            res;
        req = {body: bugData};
        res = {send: this.stub()};
        // Stub the save method of the Bug model stub to return bugData
        bugStub.prototype.save = sinon.stub().yields('error cause');
        bugControllerProxy.postBug(req, res);
        sinon.assert.calledWith(res.send, 'Could not save bug - error cause');
        done();
    }));
});
