const React = require("react")
const ReactDOM = require("react-dom")
const ReactRedux = require("react-redux")
const store = require("./store")
const App = require("./app")

const $ = React.createElement

// window.Perf = require("react-addons-perf")
// console.log(window.Perf)

window.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("react-root")
  const component = $(ReactRedux.Provider, {store}, $(App))
  ReactDOM.render(component, root)
}, false)
