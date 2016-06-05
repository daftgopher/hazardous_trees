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
          loaders: ["style", "css", "sass"]
      }
    ],
  },
  resolve: {
    extensions: ['', '.js']
  }
}