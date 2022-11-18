/* global copy */

// Go to Gen9 stats table on Pokémon DB and paste in the browser console...
//
// https://pokemondb.net/pokedex/stats/gen9

(function () {
  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function $$(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function getMonsters() {
    const table = $("#pokedex");
    return $$("tbody tr", table).map((row) => {
      const [
        cellIconAndNumber,
        cellName,
        cellTypes,
        cellTotal,
        cellHP,
        cellAttack,
        cellDefense,
        cellSpAtk,
        cellSpDef,
        cellSpeed,
      ] = $$("td", row);
      const spriteURL = $("img", cellIconAndNumber).src;
      const number = Number(
        $(".infocard-cell-data", cellIconAndNumber).textContent
      );
      const name = $(".ent-name", cellName).textContent;
      const form = $(".text-muted", cellName)?.textContent;
      const types = $$(".type-icon", cellTypes).map((t) =>
        t.textContent.toLowerCase()
      );
      const total = Number(cellTotal.textContent);
      const hp = Number(cellHP.textContent);
      const attack = Number(cellAttack.textContent);
      const defense = Number(cellDefense.textContent);
      const spAttack = Number(cellSpAtk.textContent);
      const spDefense = Number(cellSpDef.textContent);
      const speed = Number(cellSpeed.textContent);
      return {
        name,
        speciesNames: {
          en: name,
        },
        formNames: {
          en: form,
        },
        number,
        spriteURL,
        form,
        types,
        total,
        hp,
        attack,
        defense,
        spAttack,
        spDefense,
        speed,
      };
    });
  }

  const monsters = getMonsters();
  copy(monsters);
  console.log(monsters);
})();
