const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    contentScript: resolve('./src/extension/contentScript.js'),
    backgroundScript: resolve('./src/extension/background.js'),
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

    new CopyWebpackPlugin([
      { from: resolve('./src/extension/popup.js'), to: resolve(config.EXTENSION_DIR) },
      { from: resolve('./src/extension/popup.html'), to: resolve(config.EXTENSION_DIR) },
    ]),
  ],

  optimization: {
    minimize: false,
  },

  watch: true,
};

module.exports = webpackConfig;
