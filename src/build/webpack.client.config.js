const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');
const config = require('./config');

const { resolve } = utils;
const { env, host, port, publicDir, webpackMode } = config;

const webpackConfig = {
  mode: webpackMode,

  entry: ['@babel/polyfill', resolve('./src/client/index.jsx')],

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      '@': resolve('./src/client'),
    },
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'imgs/',
          },
        }],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./src/client/index.html'),
      minify: true,
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],

  output: {
    path: publicDir,
    publicPath: '/',
    filename: '[name].[hash].js',
  },
};

switch (env) {
  case 'local-dev':
    const liveReloadDelay = 200;
    const LiveReloadPlugin = require('webpack-livereload-plugin');
    webpackConfig.plugins.push(new LiveReloadPlugin({ appendScriptTag: true, delay: liveReloadDelay }));

    webpackConfig.watch = true;
    webpackConfig.watchOptions = {
      aggregateTimeout: liveReloadDelay,
      ignored: /node_modules/,
    };
    break;

  case 'webpack-dev-svr':
    webpackConfig.devServer = {
      contentBase: publicDir,
      port: port,
      publicPath: `${host}:${port}/`,
      watchContentBase: true,
      // Workaround for https://github.com/webpack/webpack-dev-server/issues/1604
      disableHostCheck: true,
    };
    break;
}

module.exports = webpackConfig;
