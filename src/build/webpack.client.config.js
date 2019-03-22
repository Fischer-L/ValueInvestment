const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('./utils');
const config = require('./config');

const { resolve } = utils;
const { env, port, publicDir } = config;

const webpackConfig = {
  mode: env === 'production' ? 'production' : 'development',

  entry: ['@babel/polyfill', resolve('./src/client/index.jsx')],

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      '~': resolve('./src'),
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
    // eslint-disable-next-line import/no-extraneous-dependencies, import/order, global-require
    const LiveReloadPlugin = require('webpack-livereload-plugin');
    webpackConfig.plugins.push(new LiveReloadPlugin({ appendScriptTag: true, delay: 600 }));

    webpackConfig.watch = true;
    webpackConfig.watchOptions = {
      aggregateTimeout: 50,
      ignored: /node_modules/,
    };
    break;

  case 'webpack-dev-svr':
    webpackConfig.devServer = {
      port,
      publicPath: `http://localhost:${port}`,
      contentBase: publicDir,
      watchContentBase: true,
      // Workaround for https://github.com/webpack/webpack-dev-server/issues/1604
      disableHostCheck: true,
    };
    break;
}

module.exports = webpackConfig;
