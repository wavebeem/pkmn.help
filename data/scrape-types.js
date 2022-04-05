/* global copy */

// https://pokemondb.net/type/old
// https://pokemondb.net/type
//
// Run from Dev Tools

(function () {
  function convert(text) {
    switch (text) {
      case "0":
        return 0;
      case "½":
        return 1 / 2;
      case "":
        return 1;
      case "2":
        return 2;
      default:
        throw new Error(`convert: "${text}"`);
    }
  }

  const domTable = document.querySelectorAll("table")[0];
  const table = [];
  for (const domRow of domTable.querySelectorAll("tr")) {
    const row = [];
    for (const domCell of domRow.querySelectorAll("td")) {
      row.push(convert(domCell.textContent));
    }
    table.push(row);
  }

  copy(table);
})();
