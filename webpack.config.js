const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

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
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public/index.html", to: "index.html", toType: "file" },
      ],
    }),

  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'raw-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
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
