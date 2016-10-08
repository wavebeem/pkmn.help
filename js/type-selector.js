var React = require("react")
var Data = require("./data")

var $ = React.createElement

var TypeSelector = React.createClass({
  displayName: "TypeSelector",
  menu(title, hidden, value, types) {
    var self = this
    var items = types.map(function(t) {
      return $("button", {
        key: t,
        value: t,
        className:
          "type-selector__button " +
          "type-selector__menu-button " +
          "type-" + t,
        onClick: function() { self.choose(t) }
      }, t)
    })
    var className =
      "type-selector__menu " +
      (hidden ? "type-selector__menu--hidden " : "")
    return $("div", {className},
      $("h3", {}, title),
      items
    )
  },
  toggleModal() {
    if (this.state.open) {
      this.closeModal()
    } else {
      this.openModal()
    }
  },
  openModal() {
    this.setState({open: true})
  },
  closeModal() {
    this.setState({open: false})
    if (this.elemButton) {
      this.elemButton.focus()
    }
  },
  choose(type) {
    this.props.onChange(type)
    this.closeModal()
  },
  getInitialState() {
    return {open: false}
  },
  render() {
    var self = this
    var state = this.state
    var props = this.props
    var types = props.includeNone ? Data.typesOrNone : Data.types
    var ref = function(elem) {
      self.elemButton = elem
    }
    var button =
      $("button", {
        ref: ref,
        className:
          "type-selector__button " +
          "type-selector__main-button " +
          "type-" + props.value,
        onClick: this.toggleModal
      }, props.value)
    return $("div", {className: "type-selector"},
      button,
      this.menu(props.title, !state.open, props.value, types)
    )
  }
})

module.exports = TypeSelector
