const React = require("react")
const ReactDOM = require("react-dom")
const ReactRedux = require("react-redux")
const store = require("./store")
const App = require("./app")

require("smoothscroll-polyfill").polyfill()

const $ = React.createElement

// window.Perf = require("react-addons-perf")
// console.log(window.Perf)

window.addEventListener("DOMContentLoaded", () => {
  // Preload the scroll to top image.
  document.createElement("img").src = "top.svg"
  const root = document.getElementById("react-root")
  const component = $(ReactRedux.Provider, {store}, $(App))
  ReactDOM.render(component, root)
}, false)
