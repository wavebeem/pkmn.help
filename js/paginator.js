const React = require("react")
const Button = require("./Button")

const $ = React.createElement

const PREV_TEXT = "◀ prev"
const NEXT_TEXT = "next ▶"

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}

function prevButton(loc, {updatePagePrev}, show) {
  const onClick = () => {
    if (loc === "bottom") {
      scrollToTop()
    }
    updatePagePrev()
  }
  const disabled = !show
  return $(Button, {onClick, disabled}, PREV_TEXT)
}

function nextButton(loc, {updatePageNext}, show) {
  const onClick = () => {
    if (loc === "bottom") {
      scrollToTop()
    }
    updatePageNext()
  }
  const disabled = !show
  return $(Button, {onClick, disabled}, NEXT_TEXT)
}

function createPaginationButtons(loc, props, hasPrev, hasNext) {
  return $("div", {className: "flex"},
    $("div", {className: "ph1 flex-auto"}, prevButton(loc, props, hasPrev)),
    $("div", {className: "ph1 flex-auto"}, nextButton(loc, props, hasNext))
  )
}

function Paginator(props) {
  const {
    currentPage,
    pageSize,
    items,
    emptyState,
    render
  } = props
  const numPages = Math.ceil(items.length / pageSize)
  const hasPrev = currentPage > 0
  const hasNext = currentPage < (numPages - 1)
  const i = pageSize * currentPage
  const pageItems = items.slice(i, i + pageSize)
  return $("div", {},
    createPaginationButtons("top", props, hasPrev, hasNext),
    pageItems.length === 0
      ? emptyState
      : $("div", {key: `page-${currentPage}`}, pageItems.map(render)),
    createPaginationButtons("bottom", props, hasPrev, hasNext)
  )
}

module.exports = Paginator
