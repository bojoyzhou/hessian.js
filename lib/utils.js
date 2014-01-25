/**!
 * hessian.js - lib/utils.js
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 */

var object = require('./object');

var MAX_INT_8 = exports.MAX_INT_8 = Math.pow(2, 7);
var MAX_INT_16 = exports.MAX_INT_16 = Math.pow(2, 15);
var MAX_INT_32 = exports.MAX_INT_32 = Math.pow(2, 31);
var MAX_INT = exports.MAX_INT = Math.pow(2, 53);
var MAX_INT_HIGH = exports.MAX_INT_HIGH = Math.pow(2, 21);

var MAX_BYTE_TRUNK_SIZE = exports.MAX_BYTE_TRUNK_SIZE = 0x8000;
var MAX_CHAR_TRUNK_SIZE = exports.MAX_CHAR_TRUNK_SIZE = 0x8000;

exports.getSerializer = function (type) {
  if (typeof type === 'string') {
    // get from SERIALIZER_MAP
    if (object.SERIALIZER_MAP[type]) {
      return 'write' + object.SERIALIZER_MAP[type];
    }
    // array
    if (type[0] === '[') {
      return 'writeArray';
    }
    // object
    return 'writeObject';
  }
};

exports.handleLong = function (val) {
  var notSafeInt = val.high > MAX_INT_HIGH ||       // bigger than 2^54
    (val.high === MAX_INT_HIGH && val.low > 0) ||   // between 2^53 ~ 2^54
    val.high < -1 * MAX_INT_HIGH ||                 // smaller than -2^54
    (val.high === -1 * MAX_INT_HIGH && val.low < 0);// between -2^54 ~ -2^53

  if (notSafeInt) {
    console.warn('Read a not safe long, translate it to string');
    return val.toString();
  }
  return val.toNumber();
};

exports.lengthOfUTF8 = function (head) {
  if (head < 0x80) {
    return 1;
  }
  if ((head & 0xe0) === 0xc0) {
    return 2;
  }

  if ((head & 0xf0) === 0xe0) {
    return 3;
  }
};