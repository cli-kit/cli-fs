var fs = require('fs');

/**
 *  Test if a file exists (-e).
 *
 *  @param value The value to test.
 *  @param callback A callback function which
 *  makes this test asynchronous.
 */
function exists(value, callback) {
  var async = typeof callback == 'function';
  var method = async ? 'exists' : 'existsSync';
  try {
    return fs[method](value, function(exists) {
      if(async) callback(exists);
    });
  }catch(e){
    return false;
  }
}

/**
 *  Retrieve a fs.Stats object from value.
 *
 *  @param value The value to stat.
 *  @param ln Use the lstat functions.
 *  @param fs Use the fstat functions.
 *  @param callback A callback function which
 *  makes this asynchronous.
 */
function stat(value, ln, fd, callback) {
  var async = typeof callback == 'function';
  var method = async ? 'stat' : 'statSync';
  if(ln && !fd) method = 'l' + method;
  if(fd) method = 'f' + method;
  return fs[method](value, function(err, stats) {
    if(async) callback(err, stats);
  });
}

function block(value, stats, callback) {
  return stats.isBlockDevice();
}

function character(value, stats, callback) {
  return stats.isCharacterDevice();
}

function directory(value, stats, callback) {
  return stats.isDirectory();
}

function file(value, stats, callback) {
  return stats.isFile();
}

/**
 *  These operators require a stats object.
 */
var map = {
  b: { method: block },
  f: { method: file },
  c: { method: character },
  d: { method: directory },
}

/**
 *  Test an expression and return a boolean.
 *
 *  Mimics the behaviour of test(1).
 *
 *  @param expr The expression to test.
 *  @param value The value to test.
 *  @param callback An optional callback which
 *  makes the operation asynchronous.
 */
function test(expr, value, callback) {
  var async = typeof callback == 'function';
  var res = false, method, stats;
  expr = expr.replace(/^-+/, '');
  switch(expr) {
    case "e":
      res = exists(value, callback);
      break;
    default:
      if(map[expr]) {
        if(!async) {
          try {
            stats = stat(value, map[expr].ln, map[expr].fd, null);
          }catch(e) {
            return false;
          }
          return map[expr].method(value, stats);
        }
        stat(value, map[expr].ln, map[expr].fd, function(err, stats) {
          if(err) return callback(false);
          callback(map[expr].method(value, stats));
        });
      }
  }
  return res;
}

module.exports = {};
module.exports.test = test;
