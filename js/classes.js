// function addClass(acc, x) {
//   let rest = ""
//   if (typeof x === "string") {
//     rest = x
//   } else if (Array.isArray(x)) {
//     rest = classes(...x)
//   } else if (x && typeof x === "object") {
//     rest = Object.keys(x)
//       .filter(k => x[k])
//       .map(x => classes(x))
//       .join(" ")
//   }
//   return (acc + " " + rest).trim()
// }

// function classes(...args) {
//   return args
//     .filter(Boolean)
//     .reduce(addClass, "")
// }

window.C = module.exports = require("classnames")
