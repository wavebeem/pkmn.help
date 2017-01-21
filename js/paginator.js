const React = require("react")
const classes = require("./classes")

const $ = React.createElement

const buttonClass = classes(
  "db center",
  "ba b--black-10 br3",
  "bg-blue white",
  "pv3 ph4",
  "b f4",
  "ttu",
  "chunky-focus"
)

function prevButton({updatePagePrev}) {
  const onClick = () => updatePagePrev()
  return $("button", {onClick, className: buttonClass}, "Previous page")
}

function nextButton({updatePageNext}) {
  const onClick = () => updatePageNext()
  return $("button", {onClick, className: buttonClass}, "Next page")
}

function Paginator(props) {
  const {
    updatePageNext,
    updatePagePrev,
    currentPage,
    pageSize,
    items,
    render
  } = props
  const numPages = Math.ceil(items.length / pageSize)
  const hasPrev = currentPage > 0
  const hasNext = currentPage < (numPages - 1)
  const i = pageSize * currentPage
  const pageItems = items.slice(i, i + pageSize)
  return $("div", {},
    hasPrev ? prevButton(props) : null,
    $("div", {key: `page-${currentPage}`}, pageItems.map(render)),
    hasNext ? nextButton(props) : null,
  )
}

module.exports = Paginator
