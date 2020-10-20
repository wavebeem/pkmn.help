const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [path.join(__dirname, "src/main.tsx")],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: __dirname,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        // Not actually loading any JS files any more, but whatever
        test: /\.(ts|tsx|js)?$/,
        loader: "ts-loader",
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        // We need to load Tachyons which is in node_modules
        // include: path.resolve(__dirname, "src")
      },
      {
        test: /\.(png|svg)$/,
        loader: "file-loader",
        options: {
          name: "files/[path][name].[contenthash:8].[ext]",
        },
        include: [
          path.resolve(__dirname, "img"),
          path.resolve(__dirname, "svg"),
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "dist/index.html"),
      template: path.join(__dirname, "template/index.html"),
      hash: true,
    }),
  ],
};
