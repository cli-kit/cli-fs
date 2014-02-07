var path = require('path');
var expect = require('chai').expect;
var test = require('../..').test;
var exec = require('child_process').exec;
var files = path.normalize(path.join(__dirname, '..', 'files'));
var etc = '/etc';
var dev = '/dev';

var cmd = 'test';
var missing = 'missing.txt';
var directory = etc;
var regular = path.join(etc, 'passwd');
var block = path.join(dev, 'vn0');
var character = path.join(dev, 'zero');
var tty = '1';

function run(args, callback) {
  args.unshift(cmd);
  var command = args.join(' ');
  return exec(command,
    function (error, stdout, stderr) {
      if (error !== null) {
        return callback(false);
      }
      callback(true);
  });
}

describe('cli-util:', function() {
  it('should test file exists (false)', function(done) {
    var result = false;
    var expr = '-e';
    var value = missing;
    var args = [expr, value];
    run(args, function(expected) {
      expect(result).to.eql(expected);
      var res = test(expr, value);
      expect(res).to.eql(expected);
      test(expr, value, function(res) {
        expect(res).to.eql(expected);
        done();
      });
    });
  });
  it('should test file exists (true)', function(done) {
    var result = true;
    var expr = '-e';
    var value = regular;
    var args = [expr, value];
    run(args, function(expected) {
      expect(result).to.eql(expected);
      var res = test(expr, value);
      expect(res).to.eql(expected);
      test(expr, value, function(res) {
        expect(res).to.eql(expected);
        done();
      });
    });
  });
  it('should test file exists and is a regular file - missing (false)',
    function(done) {
      var result = false;
      var expr = '-f';
      var value = missing;
      var args = [expr, value];
      run(args, function(expected) {
        expect(result).to.eql(expected);
        var res = test(expr, value);
        expect(res).to.eql(expected);
        test(expr, value, function(res) {
          expect(res).to.eql(expected);
          done();
        });
      });
    }
  );
  it('should test file exists and is a regular file - directory (false)',
    function(done) {
      var result = false;
      var expr = '-f';
      var value = directory;
      var args = [expr, value];
      run(args, function(expected) {
        expect(result).to.eql(expected);
        var res = test(expr, value);
        expect(res).to.eql(expected);
        test(expr, value, function(res) {
          expect(res).to.eql(expected);
          done();
        });
      });
    }
  );
  it('should test file exists and is a regular file (true)', function(done) {
    var result = true;
    var expr = '-f';
    var value = regular;
    var args = [expr, value];
    run(args, function(expected) {
      expect(result).to.eql(expected);
      var res = test(expr, value);
      expect(res).to.eql(expected);
      test(expr, value, function(res) {
        expect(res).to.eql(expected);
        done();
      });
    });
  });
  it('should test block file - missing (false)',
    function(done) {
      var result = false;
      var expr = '-b';
      var value = missing;
      var args = [expr, value];
      run(args, function(expected) {
        expect(result).to.eql(expected);
        var res = test(expr, value);
        expect(res).to.eql(expected);
        test(expr, value, function(res) {
          expect(res).to.eql(expected);
          done();
        });
      });
    }
  );
  it('should test block file - regular (false)',
    function(done) {
      var result = false;
      var expr = '-b';
      var value = regular;
      var args = [expr, value];
      run(args, function(expected) {
        expect(result).to.eql(expected);
        var res = test(expr, value);
        expect(res).to.eql(expected);
        test(expr, value, function(res) {
          expect(res).to.eql(expected);
          done();
        });
      });
    }
  );
  it('should test block file (true)',
    function(done) {
      var result = true;
      var expr = '-b';
      var value = block;
      var args = [expr, value];
      run(args, function(expected) {
        expect(result).to.eql(expected);
        var res = test(expr, value);
        expect(res).to.eql(expected);
        test(expr, value, function(res) {
          expect(res).to.eql(expected);
          done();
        });
      });
    }
  );
})
