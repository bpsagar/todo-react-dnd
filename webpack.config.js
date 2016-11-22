const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  entry: SRC_DIR + '/app.js',
  output: {
    path: DIST_DIR + '/js/',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: SRC_DIR,
      loader: 'babel-loader'
    }]
  }
};
