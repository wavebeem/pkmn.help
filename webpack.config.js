const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Hack to put the NODE_ENV to production when we ask for minified code.
const isProd = process.argv.indexOf("-p") >= 0;
process.env.NODE_ENV = isProd ? "production" : "development";

const fileLoader = {
  test: /\.(png|svg)$/,
  loader: "file-loader",
  options: {
    name: "files/[path][name].[contenthash:8].[ext]"
  },
  include: [path.resolve(__dirname, "img"), path.resolve(__dirname, "svg")]
};

const cssLoader = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"]
  // We need to load Tachyons which is in node_modules
  // include: path.resolve(__dirname, "src")
};

const tsLoader = {
  // Not actually loading any JS files any more, but whatever
  test: /\.[tj]sx?$/,
  loader: "ts-loader",
  include: path.resolve(__dirname, "src")
};

module.exports = {
  entry: [path.join(__dirname, "src/main.tsx")],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "source-map",
  devServer: {
    contentBase: __dirname,
    compress: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [tsLoader, cssLoader, fileLoader]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "dist/index.html"),
      template: path.join(__dirname, "template/index.html"),
      hash: true
    })
  ]
};
