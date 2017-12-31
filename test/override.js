'use strict';
/**
 * @file override test
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
var setHeader = require('..').setOverrideHeader;
var assert = require('assert');
var http = require('http');
var request = require('supertest');

/*
 * test module
 */
describe('override', function() {

  var app;

  before(function(done) {

    app = http.createServer(function(req, res) {

      assert.equal(setHeader(res, 'ciao', 'pippo'), true);
      assert.equal(res.getHeader('ciao'), 'pippo');

      assert.equal(setHeader(res, 'ciao', 'pizza'), true,
        'I cant\'t override this header if present');
      assert
          .equal(res.getHeader('ciao'), 'pippo', 'should get previous header');

      assert.equal(setHeader(res, 'PippO', 'foo',
        'should override previous header, because no option is set'), true);

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end();

      // assert.equal(setHeader(res, 'ciao', 'pippo', null, true), true,
      // 'I cant\'t override this header if present, even if socket is closed');
    });
    done();
  });

  it('should return 2 headers', function(done) {

    request(app).get('/').expect('ciao', 'pippo').expect('PippO', 'foo')
        .expect(200, done);
  });
});
