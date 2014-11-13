'use strict';
/**
 * @file basic test
 * @module setheaders
 * @package setheaders
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var setHeader = require('..');
    var assert = require('assert');
    var http = require('http');
    var request = require('supertest');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * test module
 */
describe('basic', function() {

    var app;
    describe('normal', function() {

        before(function(done) {

            app = http.createServer(function(req, res) {

                assert.equal(setHeader(res, 'ciao', 'pippo'), true);
                assert.equal(res.getHeader('ciao'), 'pippo');

                assert.equal(setHeader(res, 'ciao', 'pizza'), true);
                assert.equal(res.getHeader('ciao'), 'pizza');

                assert.equal(setHeader(res, 'PippO', 'foo'), true);

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end();
            });
            done();
        });

        it('should return 2 headers', function(done) {

            request(app).get('/').expect('ciao', 'pizza')
                    .expect('PippO', 'foo').expect(200, done);
        });
    });

    describe('protect', function() {

        before(function(done) {

            app = http.createServer(function(req, res) {

                assert.equal(setHeader(res, 'ciao', 'pippo', true), true);
                assert.equal(res.getHeader('ciao'), 'pippo');

                assert.equal(setHeader(res, 'ciao', 'pizza'), false);
                assert.equal(res.getHeader('ciao'), 'pippo');

                assert.equal(setHeader(res, 'PippO', 'foo'), true);

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end();
            });
            done();
        });

        it('should return 2 headers', function(done) {

            request(app).get('/').expect('ciao', 'pippo')
                    .expect('PippO', 'foo').expect(200, done);
        });
    });

    describe('override', function() {

        before(function(done) {

            app = http
                    .createServer(function(req, res) {

                        assert.equal(setHeader(res, 'ciao', 'pippo'), true);
                        assert.equal(res.getHeader('ciao'), 'pippo');

                        assert
                                .equal(setHeader(res, 'ciao', 'pizza', false, false), true);
                        assert.equal(res.getHeader('ciao'), 'pippo');

                        assert.equal(setHeader(res, 'PippO', 'foo'), true);

                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        });
                        res.end();
                    });
            done();
        });

        it('should return 2 headers', function(done) {

            request(app).get('/').expect('ciao', 'pippo')
                    .expect('PippO', 'foo').expect(200, done);
        });
    });
});
