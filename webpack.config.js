module.exports = {
  entry: './src/panel.jsx',
  // entry: './src/panel.js',
  output: {
    path: __dirname + '/dist',
    filename: 'panel.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  node: {
    fs: 'empty'
  }
}
