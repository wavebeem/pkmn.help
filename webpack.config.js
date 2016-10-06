/* global __dirname */

var path = require("path")
// var webpack = require("webpack")

module.exports = {
  entry: [
    path.join(__dirname, "js/main.js")
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production")
    //   }
    // })
  ]
}
