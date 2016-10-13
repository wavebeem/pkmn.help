function concat(a, b) {
  return a.concat(b)
}

function classes(...args) {
  return args.reduce(concat, []).filter(Boolean).join(" ")
}

module.exports = classes
