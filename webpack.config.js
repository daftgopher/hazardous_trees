var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('public/style.css');

module.exports = {
  entry: ['./app.js'],
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js/,
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        },
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
      }
    ],
  },
  plugins: [
    extractCSS,
  ],
  resolve: {
    extensions: ['', '.js']
  }
}