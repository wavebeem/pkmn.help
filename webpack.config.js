/* global __dirname */

var path = require("path")

module.exports = {
  entry: [
    path.join(__dirname, "js/main.js")
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015", "babili"]
        }
      }
    ]
  }
}
