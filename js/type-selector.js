var React = require("react")
var Data = require("./data")
var classes = require("./classes")

var $ = React.createElement

var TypeSelector = React.createClass({
  displayName: "TypeSelector",
  menu(title, hidden, value, types) {
    var n = types.length - 1
    var items = types.map((t, i) =>
      $("button", {
        key: t,
        className: classes(
          "type-" + t,
          "db w-100",
          "ba b--white",
          "ttu b pointer",
          "pa3",
          "focus-border-super",
          i === 0 && "br1 br--top",
          i < n && "bb-0",
          i === n && "br1 br--bottom"
        ),
        onClick: () => this.choose(t)
      }, t)
    )
    var className = classes(
      "animation-FadeIn-300ms",
      "relative balloon-top",
      "bg-moon-gray b--moon-gray",
      "br2 pa2 mv3",
      hidden && "dn"
    )
    return $("div", {className}, items)
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
    document.body.scrollTop = 0
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
    var state = this.state
    var props = this.props
    var types = props.includeNone ? Data.typesOrNone : Data.types
    var ref = elem => {
      this.elemButton = elem
    }
    var button =
      $("button", {
        ref: ref,
        className: classes(
          "type-" + props.value,
          "db w-100 mv2",
          "focus-border",
          "b--black-10",
          "pa3",
          "ttu b ba bt-0 bl-0 br-0 bw2 pointer br-pill bb b"
        ),
        onClick: this.toggleModal
      }, props.value)
    return $("div", {className: "type-selector"},
      button,
      this.menu(props.title, !state.open, props.value, types)
    )
  }
})

module.exports = TypeSelector
