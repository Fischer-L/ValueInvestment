const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const TerserJSPlugin = require('terser-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const utils = require('./utils');
const config = require('./config_server');

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

  output: {
    path: publicDir,
    publicPath: '/',
    filename: '[name].[contenthash:8].js',
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
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash:8].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'imgs/',
            },
          },
          'image-webpack-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./src/client/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
  ],


  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({}),
    ],
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
