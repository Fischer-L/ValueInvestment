
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname, '../../../');

function resolve(pathFromRoot) {
  return path.resolve(rootDir, pathFromRoot);
}

module.exports = {
  entry: resolve('./src/client/index.jsx'),

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      '@': resolve('./src/client'),
    },
  },

  watch: true,

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
    path: resolve('public'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },

  devServer: {
    contentBase: resolve('public'),
    port: 9000,
    publicPath: 'http://localhost:9000/',
    watchContentBase: true,
  },
};
