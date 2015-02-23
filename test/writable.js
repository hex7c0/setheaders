'use strict';
/**
 * @file writable test
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
var setHeader = require('..').setWritableHeader;
var assert = require('assert');
var http = require('http');
var request = require('supertest');

/*
 * test module
 */
describe('writable', function() {

  var app;

  before(function(done) {

    app = http.createServer(function(req, res) {

      assert.equal(setHeader(res, 'ciao', 'pippo'), true);
      assert.equal(res.getHeader('ciao'), 'pippo');

      assert.equal(setHeader(res, 'PippO', 'foo', null, null, true), true);

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end();

      assert.equal(setHeader(res, 'ciao', 'pippo', null, null, true), false,
        'should return false because socket is sent');

      // hack
      res._headerSent = false;
      try {
        assert.equal(setHeader(res, 'ciao', 'pippo', null, null, true), false);
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
