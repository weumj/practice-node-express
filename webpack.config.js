const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV ? 'development' : 'production',
  devtool: 'source-map',
  target: 'node',
  entry: {
    index: [
      // "babel-regenerator-runtime",
      // "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",
      './src/index.ts',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/app.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
        include: path.join(__dirname, 'src'),
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin('public/'),
    new CopyWebpackPlugin([
      {
        from: './src/views/**/*.html',
        to: './views',
        flatten: true,
      },
    ]),
  ],
  node: {
    __filename: false,
    __dirname: false,
  },
};
