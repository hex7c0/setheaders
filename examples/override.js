'use strict';
/**
 * @file override example
 * @module setheaders
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
var setHeader = require('..'); // require('setheaders')
var http = require('http');

http.createServer(function(req, res) {

  setHeader(res, 'ciao', 'pippo');
  setHeader(res, 'ciao', 'pippo2', null, true); // pippo as "ciao" header, because already set

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello World\n');
}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');
