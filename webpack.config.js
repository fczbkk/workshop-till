const path = require('path')

module.exports = {
  watch: true,
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'static'),
    publicPath: 'static/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: [
          'babel-loader'
        ]
      }
    ]
  }
}
