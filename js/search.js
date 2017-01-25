const React = require("react")
const classes = require("./classes")

const $ = React.createElement

function Search(props) {
  const {updateSearch, search} = props
  const clearSearch = () => updateSearch("")
  const input = $("input", {
    type: "search",
    autoComplete: "off",
    autoCorrect: "off",
    inputMode: "verbatim",
    autoCapitalize: "none",
    className: classes(
      "f2 f1-l w-100 border-box",
      "pv2",
      "chunky-focus",
      "inset-shadow",
      "br-pill ba",
      "b--black-30"
    ),
    style: {
      paddingLeft: 65,
      paddingRight: 65,
      height: 55
    },
    placeholder: "search",
    value: search,
    onChange: event =>
      updateSearch(event.target.value),
  })
  const icon = $("img", {
    src: "search.svg",
    width: 40,
    height: 40,
    className: "absolute",
    style: {left: 12, top: 10}
  })
  const clear = $("img", {
    src: "clear.svg",
    width: 40,
    height: 40,
    onClick: clearSearch,
    className: classes(
      "absolute pointer",
      {dn: search === ""}
    ),
    style: {right: 8, top: 8}
  })
  return $("div", {className: "relative mv4"}, icon, input, clear)
}

module.exports = Search
