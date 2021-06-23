const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const publicPath = "/";

const development = {
  stats: "minimal",
  entry: [path.join(__dirname, "src/main.tsx")],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath,
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    stats: "minimal",
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    new CopyPlugin({
      patterns: [{ from: "public", to: "dist" }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "dist/index.html"),
      template: path.join(__dirname, "template/index.html"),
      hash: true,
    }),
    new webpack.DefinePlugin({
      "process.env.PUBLIC_PATH": JSON.stringify(publicPath),
    }),
  ],
};

const production = {
  ...development,
  plugins: [
    ...development.plugins,
    process.env.CI ? undefined : new BundleAnalyzerPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(path.join(__dirname, "src/**/*.{ts,tsx,js}"), {
        nodir: true,
      }),
      // e.g. `.type-grass` or `.type-fire`, these classes are constructed
      // dynamically right now, so we have to safelist them so they won't get
      // purged
      safelist: [/^type-/],
    }),
  ].filter((x) => x),
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

module.exports = (_, { mode }) => {
  return { development, production }[mode];
};
