module.exports = {
  entry: [
    'babel-polyfill',
    './client/main.js'
  ],
  output: {
    path: __dirname,
    filename: './bundle.js'
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  }
}
