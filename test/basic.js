'use strict';
/**
 * @file basic test
 * @module setheaders
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
var setHeader = require('..');
var assert = require('assert');
var http = require('http');
var request = require('supertest');

/*
 * test module
 */
describe(
  'basic',
  function() {

    var app;

    describe('normal', function() {

      before(function(done) {

        app = http.createServer(function(req, res) {

          assert.equal(setHeader(res, 'ciao', 'pippo',
            'should set normal header'), true);
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

        request(app).get('/').expect('ciao', 'pizza').expect('PippO', 'foo')
        .expect(200, done);
      });
    });

    describe('protect', function() {

      before(function(done) {

        app = http.createServer(function(req, res) {

          assert.equal(setHeader(res, 'ciao', 'pippo', true), true,
            'should protect this header from being overridden');
          assert.equal(res.getHeader('ciao'), 'pippo');

          setHeader(res, 'ciao', 'pizza');
          setHeader(res, 'ciao', 'pizza', true);
          assert.equal(res.getHeader('ciao'), 'pippo',
            'I can\'t change this header :(');

          assert.equal(setHeader(res, 'PippO', 'foo'), true);

          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.end();
        });
        done();
      });

      it('should return 2 headers', function(done) {

        request(app).get('/').expect('ciao', 'pippo').expect('PippO', 'foo')
        .expect(200, done);
      });
    });

    describe(
      'override',
      function() {

        before(function(done) {

          app = http
          .createServer(function(req, res) {

            assert.equal(setHeader(res, 'ciao', 'pippo'), true);
            assert.equal(res.getHeader('ciao'), 'pippo');

            assert.equal(setHeader(res, 'ciao', 'pizza', null, true,
              'I cant\'t override this header if present'), true);
            assert.equal(res.getHeader('ciao'), 'pippo',
              'should get previous header');

            assert.equal(setHeader(res, 'PippO', 'foo',
              'should override previous header, because no option is set'),
              true);

            res.writeHead(200, {
              'Content-Type': 'text/plain'
            });
            res.end();

            assert
            .equal(setHeader(res, 'ciao', 'pippo', null, true), true,
              'I cant\'t override this header if present, even if socket is closed');
          });
          done();
        });

        it('should return 2 headers', function(done) {

          request(app).get('/').expect('ciao', 'pippo').expect('PippO', 'foo')
          .expect(200, done);
        });
      });

    describe('writable', function() {

      before(function(done) {

        app = http.createServer(function(req, res) {

          assert.equal(setHeader(res, 'ciao', 'pippo'), true);
          assert.equal(res.getHeader('ciao'), 'pippo');

          assert.equal(setHeader(res, 'PippO', 'foo', null, null, true), true);

          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          res.end();

          assert.equal(setHeader(res, 'ciao', 'pippo', null, null, true),
            false, 'should return false because socket is sent');

          // hack
          res._headerSent = false;
          try {
            assert.equal(setHeader(res, 'ciao', 'pippo', null, null, true),
              false, 'should return Exception because socket is sent');
          } catch (e) {
            assert.equal(e.message, 'Can\'t set headers after they are sent.');
          }
        });
        done();
      });

      it('should return 2 headers', function(done) {

        request(app).get('/').expect('ciao', 'pippo').expect('PippO', 'foo')
        .expect(200, done);
      });
    });
  });
