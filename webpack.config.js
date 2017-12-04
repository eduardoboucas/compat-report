module.exports = {
  entry: './src/index.jsx',
  // entry: './src/panel.js',
  output: {
    path: __dirname + '/dist',
    filename: 'panel.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              camelCase: true,
              modules: true,
              url: false
            }
          }
        ]
      }
    ]
  },
  node: {
    fs: 'empty'
  }
}
