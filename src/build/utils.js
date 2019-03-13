const path = require('path');

const rootDir = path.resolve(__dirname, '../../');

function resolve(pathFromRoot, root = rootDir) {
  return path.resolve(root, pathFromRoot);
}

module.exports = {
  resolve,
};
