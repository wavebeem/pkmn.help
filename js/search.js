const React = require("react")
const classnames = require("classnames")
const ImageClear = require("../svg/clear.svg").default
const ImageSearch = require("../svg/search.svg").default

const $ = React.createElement

function Search(props) {
  const {updateSearch, search} = props
  const clearSearch = () => updateSearch("")
  const input = $("input", {
    "aria-label": "search",
    type: "search",
    autoComplete: "off",
    autoCorrect: "off",
    inputMode: "verbatim",
    autoCapitalize: "none",
    className: classnames(
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
  const iconColor = "#888"
  const icon = $("div", {
    className: "absolute",
    style: {
      fill: iconColor,
      width: 40,
      height: 40,
      left: 12,
      top: 10
    },
  }, $(ImageSearch))
  const clear = $("div", {
    role: "presentation",
    onClick: clearSearch,
    className: classnames(
      "absolute pointer",
      {dn: search === ""}
    ),
    style: {
      fill: iconColor,
      width: 40,
      height: 40,
      right: 8,
      top: 8
    }
  }, $(ImageClear))
  return $("div", {className: "relative mv4"}, icon, input, clear)
}

module.exports = Search
