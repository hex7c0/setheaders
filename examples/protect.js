'use strict';
/**
 * @file protect example
 * @module setheaders
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var setHeader = require('..'); // require('setheaders')
var http = require('http');

http.createServer(function(req, res) {

  // ignore `pippo2` setter
  setHeader(res, 'ciao', 'pippo', true);
  setHeader(res, 'ciao', 'pippo2'); // `pippo` as "ciao" header, because it's protected

  setHeader.setProctedHeader(res, 'hello', 'pippo'); // you can use setProctedHeader as shortcut
  setHeader.setProctedHeader(res, 'hello', 'pippo2');

  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello World\n');
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');
