'use strict';
/**
 * @file protect example
 * @module setheaders
 * @package setheaders
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var setHeader = require('..'); // require('setheaders')
    var http = require('http');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}
http.createServer(function(req, res) {

    setHeader(res, 'ciao', 'pippo', true);
    var a = setHeader(res, 'ciao', 'pippo2');
    // return false, pippo as cookie
    console.log(a);

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World\n');
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');
