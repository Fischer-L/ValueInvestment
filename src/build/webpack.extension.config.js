const exec = require('child_process').exec;

const utils = require('./utils');
const config = require('./config_extension');

const { resolve } = utils;

class ManifestMakerPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ManifestMakerPlugin', (compilation, done) => {
      exec('node ' + resolve('./src/extension/manifest.js'));
      done();
    });
  }
}

const webpackConfig = {
  mode: 'production',

  entry: {
    backgroundScript: resolve('./src/extension/background.js'),
    contentScript: resolve('./src/extension/contentScript.js'),
    fgContentScript: resolve('./src/extension/fgContentScript.js'),
    gwContentScript: resolve('./src/extension/gwContentScript.js'),
    giContentScript: resolve('./src/extension/giContentScript.js'),
  },

  resolve: {
    extensions: [ '.jsx', '.js', '.json' ],
    alias: {
      '~': resolve('./src'),
    },
  },

  output: {
    path: resolve(config.EXTENSION_DIR),
    publicPath: '/',
    filename: '[name].js',
  },

  devtool: 'inline-source-map',

  module: {
    rules: [],
  },

  plugins: [
    new ManifestMakerPlugin(),
  ],

  optimization: {
    minimize: false,
  },

  watch: process.env.ENV !== 'production',
};

module.exports = webpackConfig;
