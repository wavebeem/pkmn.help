// Go to this Bulbapedia URL:
// https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_National_Pok%C3%A9dex_number
//
// Copy paste this code into the JavaScript console
//
// This will copy the scraped Pokemon data to your clipboard
//
// Now paste this data into the JSON file

function main() {
  const monsters = [];
  let id = 0;
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
        const monster = {
          id: `pkmn-${id}`,
          name: data[3],
          number: Number(data[1].slice(1)),
          types: [type1, type2].filter(x => x)
        };
        monsters.push(monster);
        id++;
      }
    }
  }
  copy(monsters);
}

main();
