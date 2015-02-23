'use strict';
/**
 * @file protect test
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
var setHeader = require('..').setProctedHeader;
var assert = require('assert');
var http = require('http');
var request = require('supertest');

/*
 * test module
 */
describe('protect', function() {

  var app;

  before(function(done) {

    app = http.createServer(function(req, res) {

      assert.equal(setHeader(res, 'ciao', 'pippo', true), true,
        'should protect this header from being overridden');
      assert.equal(res.getHeader('ciao'), 'pippo');

      setHeader(res, 'ciao', 'pizza');
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
