const path = require("path");
const webpack = require("webpack");

// Hack to put the NODE_ENV to production when we ask for minified code.
const isProd = process.argv.indexOf("-p") >= 0;
process.env.NODE_ENV = isProd ? "production" : "development";

const svgLoader = {
  test: /\.svg$/,
  use: [
    {
      loader: "react-svg-loader",
      options: {
        es5: true,
        svgo: {
          plugins: [{ removeTags: true }]
        }
      }
    }
  ]
};

const tsLoader = {
  // Not actually loading any JS files any more, but whatever
  test: /\.[tj]sx?$/,
  loader: "ts-loader",
  exclude: /node_modules/
};

module.exports = {
  entry: [path.join(__dirname, "js/main.tsx")],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devtool: "source-map",
  devServer: {
    contentBase: __dirname,
    compress: true,
    disableHostCheck: Boolean(process.env.C9_PID)
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    loaders: [svgLoader, tsLoader]
  },
  plugins: [new webpack.EnvironmentPlugin(["NODE_ENV"])]
};
