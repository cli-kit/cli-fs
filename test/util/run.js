var exec = require('child_process').exec;
var cmd = 'test';
/**
 *  Executes test(1) so that we can verify our
 *  unit tests correspond to it's result.
 */
module.exports = function run(args, callback) {
  args.unshift(cmd);
  var command = args.join(' ');
  return exec(command,
    function (error, stdout, stderr) {
      //console.dir(error);
      if (error !== null) {
        return callback(false);
      }
      callback(true);
  });
}

