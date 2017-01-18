const fs = require("fs")
const path = require("path")
const util = require("util")
const PKMN = require("pkmn")
const L = require("lodash")

const FILENAME = path.resolve(__dirname, "../js/pkmn.json")
const pkmn = new PKMN()

const opts = {depth: null, colors: "auto"}
const log = x => {
  console.log(util.inspect(x, opts))
  return x
}

const toJSON = data =>
  JSON.stringify(data, null, 2)

const saveAs = filename => data => new Promise(resolve => {
  fs.writeFile(filename, data, err => {
    if (err) throw err
    resolve()
  })
})

// We only want to save the subset of data we actually care about
const trimInfo = mon => ({
  name: mon.name,
  number: mon.national_id,
  abilities: mon.abilities.map(t => t.name),
  types: mon.types.map(t => t.name),
})

// The Pokéapi seems to fall over if we make all the requests in parallel,
// so let's take it easy on them :-)
const fetchSerial = names => {
  if (names.length === 0) {
    return Promise.resolve([])
  }
  const [name, ...names_] = names
  const temp = {}
  console.log(`Learning about '${name}'`)
  return pkmn.pokemon(name)
    .then(poke => temp.poke = poke)
    .then(() => fetchSerial(names_))
    .then(rest => [temp.poke, ...rest])
}

pkmn.pokedex()
  .then(resp => resp.pokemon.map(poke => poke.name))
  // .then(names => names.slice(0, 1))
  .then(fetchSerial)
  .then(mons => mons.map(trimInfo))
  .then(mons => L.sortBy(mons, "number"))
  // .then(log)
  .then(toJSON)
  .then(saveAs(FILENAME))
  .then(() => console.log("Done!"))
