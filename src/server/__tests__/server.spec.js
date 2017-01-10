'use strict';

// Setup test environment
process.env.NODE_ENV = 'test';

var request = require('supertest');
var server = require('../server');
var sinon = require('sinon');

describe("Any route", function () {
    it("returns status 200", function (done) {
        request(server)
        .get("/defaultroute")
        .expect('content-type', /text\/html/)
        .expect(200)
        .end(function(err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
    });
});
