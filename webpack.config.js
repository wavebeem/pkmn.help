const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const development = {
  entry: [path.join(__dirname, "src/main.tsx")],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
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

const production = {
  ...development,
  plugins: [...development.plugins, new BundleAnalyzerPlugin()],
};

module.exports = (_, { mode }) => {
  return { development, production }[mode];
};
