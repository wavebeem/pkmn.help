// Go to this Bulbapedia URL:
// https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number
//
// Copy paste this code into the JavaScript console
//
// This will copy the scraped Pokemon data to your clipboard
//
// Now paste this data into the JSON file

function main() {
  // console.clear();
  function chr(n) {
    return String.fromCodePoint("a".codePointAt(0) + n);
  }
  const downloads = [];
  const monsters = [];
  const map = new Map();
  for (const table of document.querySelectorAll("table")) {
    const firstHeader = table.querySelector("th");
    if (firstHeader && firstHeader.textContent.trim().endsWith("dex")) {
      for (const row of table.querySelectorAll("tr")) {
        const elements = [...row.querySelectorAll("td")];
        const data = elements.map(d => d.textContent.trim());
        if (data.length <= 0) {
          continue;
        }
        const type1 = data[4].toLowerCase();
        const type2 = data[5] ? data[5].toLowerCase() : undefined;
        const name = data[3];
        const number = Number(data[1].slice(1));
        const count = map.get(number) || 0;
        map.set(number, count + 1);
        const suffix = count > 0 ? chr(count) : "";
        const id = `pkmn-${number}${suffix}`;
        const types = [type1, type2].filter(x => x);
        const image = elements[2] ? elements[2].querySelector("img").src : null;
        monsters.push({ id, name, number, types });
        downloads.push({ image, id });
      }
    }
  }
  window.monsters = monsters;
  window.downloads = `#!/usr/bin/env bash
set -eu
cd "$(dirname $0)"
cd ..

Download() {
  local image="$1"
  local id="$2"
  local file="img/$id.png"
  if [[ ! -f $file ]]; then
    echo "Downloading $image to $file"
    curl -s "$image" > "$file"
    sleep 0.25
  else
    echo "Skipping $image, $file exists"
  fi
}

${downloads.map(m => `Download '${m.image}' '${m.id}'`).join("\n")}
`;
  console.log("Type `copy(monsters)` or `copy(downloads)`");
}

main();
