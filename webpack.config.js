var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './src/index'
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ["react-hot", "babel"],
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      loader: "style!css!sass?sourceMap"
    }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
};
