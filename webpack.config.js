const path = require('path');
const WebpackCleanPlugin = require('webpack-clean');

module.exports = {
  devServer: {
    contentBase: [
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'public')
      ],
    compress: true,
    port: 9000,
  },

  entry: './src/index.js',
  output: {
    filename: 'designer.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // plugins: [
  //   new WebpackCleanPlugin([
  //     // 'dist/designer.js'
  //   ])
  // ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

};
