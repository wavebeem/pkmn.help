"use strict"

var React = require("react")
var ReactDOM = require("react-dom")
var ReactRedux = require("react-redux")
var store = require("./store")
var App = require("./app")

var $ = React.createElement

var root = document.getElementById("react-root")
var component = $(ReactRedux.Provider, {store}, $(App))
ReactDOM.render(component, root)
