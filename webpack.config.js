/* eslint-env node */

const path = require("path")
const webpack = require("webpack")

// Hack to put the NODE_ENV to production when we ask for minified code.
const isProd = process.argv.indexOf("-p") >= 0
process.env.NODE_ENV = isProd ? "production" : "development"

const envPreset = [
  "env",
  {
    targets: {
      browsers: [
        "last 2 Firefox versions",
        "last 2 Chrome versions",
        "last 2 Safari versions",
        "iOS 10"
      ]
    }
  }
]

const svgLoader = {
  test: /\.svg$/,
  use: [
    {
      loader: "react-svg-loader",
      options: {
        es5: true,
        svgo: {
          plugins: [
            {removeTags: true}
          ]
        }
      }
    },
  ]
}


const tsLoader = {
  test: /\.tsx?$/,
  loader: "awesome-typescript-loader",
  exclude: /node_modules/,
}
const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  query: {
    presets: isProd
      ? ["es2015", "babili", envPreset]
      : ["es2015", envPreset]
  }
}

module.exports = {
  entry: [
    path.join(__dirname, "js/main.js")
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    loaders: [svgLoader, tsLoader, jsLoader]
  },
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
  ]
}
