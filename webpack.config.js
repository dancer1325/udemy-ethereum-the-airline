const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  resolve: {
    fallback: {
      crypto: false,
      assert: false,
      http: false,
      https: false,
      os: false,
      url: false                    // Fix problems which can't resolve url
      // path: false
    },
  },
  node: {
    global: false,
    __filename: false,
    __dirname: false
  },
  // devtool: 'sourcemap',           // Deprecated in the migration from webpack 4 --> 5
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/index.js'],    // Entry point to the application
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.NODE_DEBUG': JSON.stringify('development'),
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
};
