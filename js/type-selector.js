var React = require("react")
var Data = require("./data")

var $ = React.createElement

var TypeSelector = React.createClass({
  menu(hidden, value, types) {
    var self = this
    var items = types.map(function(t) {
      function ref(elem) {
        self.elemItem = elem
      }
      return $("button", {
        ref: t === self.props.value ? ref : null,
        tabIndex: 2,
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
      $("h3", {}, "pick a type"),
      items
    )
  },
  openModal() {
    this.setState({open: true})
    if (this.elemItem) {
      this.elemItem.focus()
    }
    document.body.style.overflow = "hidden"
  },
  closeModal() {
    this.setState({open: false})
    if (this.elemButton) {
      this.elemButton.focus()
    }
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
    var self = this
    var state = this.state
    var props = this.props
    var types = props.includeNone ? Data.typesOrNone : Data.types
    var ref = function(elem) {
      self.elemButton = elem
    }
    var button =
      $("button", {
        ref,
        tabIndex: 1,
        className:
          "type-selector__button " +
          "type-selector__main-button " +
          "type-" + props.value,
        onClick: this.openModal
      }, props.value)
    return $("div", {className: "type-selector"},
      button,
      this.menu(!state.open, props.value, types)
    )
  }
})

module.exports = TypeSelector
