const path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public')


module.exports = {
  entry: `${SRC_DIR}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}