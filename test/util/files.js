var path = require('path');
//var files = path.normalize(path.join(__dirname, '..', 'files'));

var bin = '/bin';
var etc = '/etc';
var dev ='/dev';

module.exports = {
  etc: etc,
  dev: dev,
  missing: path.join(etc, 'this-file-really-does-not-want-to-be-found.txt'),
  directory: dev,
  regular: path.join(etc, 'passwd'),
  block: path.join(dev, 'vn0'),
  character: path.join(dev, 'zero'),
  tty: '1',
  readable: path.join(dev, 'null'),
  writable: path.join(dev, 'null'),
  executable: path.join(bin, 'ls'),
  noop: path.join(etc, 'sudoers')
}
