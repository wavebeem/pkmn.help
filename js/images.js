const React = require("react")
const svgClear = require("../svg/clear.svg")
const svgSearch = require("../svg/search.svg")
const svgTop = require("../svg/top.svg")

const $ = React.createElement

const SvgImage = data => extras => {
  const base = {
    style: {
      lineHeight: 0,
      display: "inline-block"
    },
    dangerouslySetInnerHTML: {__html: data}
  }
  const opts = Object.assign(base, extras)
  return $("span", opts)
}

exports.Clear = SvgImage(svgClear)
exports.Search = SvgImage(svgSearch)
exports.Top = SvgImage(svgTop)
