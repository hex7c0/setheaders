'use strict';
/**
 * @file setheaders main
 * @module setheaders
 * @package setheaders
 * @subpackage main
 * @version 0.0.2
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * functions
 */
/**
 * set header on response
 * 
 * @function setHeader
 * @param {Object} res - response to client
 * @param {String} name - header's name
 * @param {String} value - header's value
 * @param {Boolean} [protect] - set protected header
 * @param {Boolean} [override] - check if I'm trying to override a header
 * @return {Boolean}
 */
function setHeader(res, name, value, protect, override) {

    var low = name.toLowerCase();

    if (override === false
            && (res._headers !== undefined && res._headers[name] !== undefined)) {
        return true;
    }

    res.setHeader(name, value);

    var previous = Object.getOwnPropertyDescriptor(res._headers, low);
    if (previous !== undefined && previous.configurable === false) {
        return false;
    }

    if (protect === true) {
        Object.defineProperty(res._headers, low, {
            configurable: false,
            enumerable: true,
            get: function() {

                return value;
            }
        });
    }

    return true;
}
module.exports = setHeader;
