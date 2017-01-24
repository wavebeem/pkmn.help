const React = require("react")
const ReactDOM = require("react-dom")
const ReactRedux = require("react-redux")
const preload = require("./preload")
const store = require("./store")
const App = require("./app")

require("smoothscroll-polyfill").polyfill()

const $ = React.createElement

// window.Perf = require("react-addons-perf")
// console.log(window.Perf)

preload([
  "top.svg",
  "search.svg",
  "clear.svg",
])

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("react-root")
  const component = $(ReactRedux.Provider, {store}, $(App))
  ReactDOM.render(component, root)
}, false)
