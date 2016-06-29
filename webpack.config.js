var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
          loader: ExtractTextPlugin.extract("style", "css!sass")
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin("./public/styles.css")
  ],
  resolve: {
    extensions: ['', '.js']
  }
}
