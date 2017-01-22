const React = require("react")
const classes = require("./classes")

const $ = React.createElement

function buttonClass(show) {
  return classes(
    "db w-100",
    "ba b--black-10 br3",
    "bg-blue white",
    "pv3 ph4",
    "b f4",
    "ttu",
    "chunky-focus",
    {hidden: !show}
  )
}

function prevButton({updatePagePrev}, show) {
  const onClick = () => updatePagePrev()
  return $("button", {onClick, className: buttonClass(show)}, "Previous page")
}

function nextButton({updatePageNext}, show) {
  const onClick = () => updatePageNext()
  return $("button", {onClick, className: buttonClass(show)}, "Next page")
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
    prevButton(props, hasPrev),
    $("div", {key: `page-${currentPage}`}, pageItems.map(render)),
    nextButton(props, hasNext),
  )
}

module.exports = Paginator
