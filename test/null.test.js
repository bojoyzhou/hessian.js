/**
 * hessian.js - test/null.test.js
 *
 * Copyright(c)
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

"use strict";

var assert = require('assert');
var hessian = require('../');

describe('null.test.js', function () {
  it('should read null', function () {
    var a = hessian.decode(new Buffer('N'));
    assert(a === null);
  });

  it('should write null', function () {
    assert.deepEqual(hessian.encode(null), new Buffer('N'));
  });

  describe('v2.0', function () {
    it('should read write as 1.0', function () {
      assert.deepEqual(hessian.encode(null, '2.0'), new Buffer('N'));
      assert(hessian.decode(new Buffer('N'), '2.0') === null);
    });
  });
});
