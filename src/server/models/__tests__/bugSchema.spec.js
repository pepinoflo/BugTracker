'use strict';

// Setup test environment
process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var Bug = require('../BugSchema');

describe('bug', function () {
    var bug;

    before(function () {
        bug = new Bug();
    });

    it('has a title', function (done) {
        bug.validate(function(err) {
            expect(err.errors.title).to.exist;
            done();
        });
    });
    
    it('has a status', function (done) {
        bug.validate(function(err) {
            expect(err.errors.status).to.exist;
            done();
        });
    });

});
