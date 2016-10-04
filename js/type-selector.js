var React = require("react")
var Data = require("./data")

var $ = React.createElement

var TypeSelector = React.createClass({
  menu(types) {
    var items = types.map(t =>
      $("button", {
        key: t,
        value: t,
        className: "type-selector__button type-selector__menu-button type-" + t,
        onClick: () => this.choose(t)
      }, t)
    )
    return $("div", {className: "type-selector__menu"},
      $("h3", {}, "pick a type"),
      items
    )
  },
  openModal() {
    this.setState({open: true})
    document.body.style.overflow = "hidden"
  },
  closeModal() {
    this.setState({open: false})
    document.body.style.overflow = ""
  },
  choose(type) {
    this.props.onChange(type)
    this.closeModal()
  },
  getInitialState() {
    return {open: false}
  },
  render() {
    var state = this.state
    var props = this.props
    var types = props.includeNone ? Data.typesOrNone : Data.types
    var button =
      $("button", {
        className: "type-selector__button type-" + props.value,
        onClick: this.openModal
      }, props.value)
    return $("div", {className: "type-selector"},
      button,
      state.open ? this.menu(types) : null
    )
  }
})

module.exports = TypeSelector
