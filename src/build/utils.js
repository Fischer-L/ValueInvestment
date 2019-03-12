const path = require('path');

const rootDir = path.resolve(__dirname, '../../');

function resolve(pathFromRoot) {
  return path.resolve(rootDir, pathFromRoot);
}

module.exports = {
  resolve,
};
