function addClass(acc, x) {
  let rest = ""
  if (typeof x === "string") {
    rest = x
  } else if (Array.isArray(x)) {
    rest = x.join(" ")
  } else if (x && typeof x === "object") {
    rest = Object.keys(x)
      .filter(k => x[k])
      .join(" ")
  }
  return (acc + " " + rest).trim()
}

function classes(...args) {
  return args
    .filter(Boolean)
    .reduce(addClass, "")
}

module.exports = classes
