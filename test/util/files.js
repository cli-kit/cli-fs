var path = require('path');

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
  tty: '1'
}
