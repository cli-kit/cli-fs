var net = require('net');
var path = require('path');
var Socket = net.Socket;
var expect = require('chai').expect;
var test = require('../..').test;
var run = require('../util/run');
var files = require('../util/files');

var server, client, port = 8124, fd, file;

describe('cli-fs:', function() {
  before(function(done) {
    server = net.createServer(function(c) {
      c.on('end', function() {});
      c.pipe(c);
    });
    server.listen(port, function() {
      client = new Socket();
      client.connect(port);
      client.on('connect', function(){
        fd = server._handle.fd;
        file = path.join(files.dev, 'fd', '' + fd);
        done();
      });
    });
  })
  after(function(done) {
    client.on('close', function() {
      server.close(function() {
        done();
      })
    });
    client.end();
  })
  it('should test socket - missing (false)',
    function(done) {
      var result = false;
      var expr = '-S';
      var value = files.missing;
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
  it('should test socket - zero (false)',
    function(done) {
      var result = false;
      var expr = '-S';
      var value = files.zero;
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
  it('should test socket (true)',
    function(done) {
      var result = true;
      var expr = '-S';
      var value = file;
      var args = [expr, fd];
      // NOTE: test -S /dev/fd/12 does not return true
      // NOTE: regardless of whether the server or client fd
      // NOTE: is used, even though fs.existsSync() returns true
      var res = test(expr, value);
      expect(res).to.eql(result);
      test(expr, value, function(res) {
        expect(res).to.eql(result);
        done();
      });
    }
  );
})
