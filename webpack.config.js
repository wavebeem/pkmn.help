const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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

const lessLoader = {
  test: /\.less$/,
  use: ["style-loader", "css-loader", "less-loader"]
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
    loaders: [svgLoader, tsLoader, lessLoader]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new HtmlWebpackPlugin({
      title: "Pokémon Type Calculator",
      filename: path.join(__dirname, "dist/index.html"),
      hash: true,
      minify: true,
      meta: {
        "theme-color": "#e7040f",
        viewport: "width=device-width, initial-scale=1",
        description:
          "A Pokémon type calculator to show strengths/weaknesses of different type combinations"
      }
    })
  ]
};
