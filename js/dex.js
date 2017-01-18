const React = require("react")
const PKMN = require("./pkmn.json")

const $ = React.createElement

function formatPKMN(p) {
  const typing = p.types.join(" / ")
  const abilities = p.abilities.join(", ")
  return `\
    #${p.number} ${p.name} (${typing})
    ${abilities}`
}

function makePKMN(p) {
  return $("pre", {key: p.number}, formatPKMN(p))
}

function Dex(props) {
  return PKMN.map(makePKMN)
}

module.exports = Dex
