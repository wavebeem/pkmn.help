declare var gtag: Function;

export function clickNav(title: string) {
  gtag("event", "click", {
    event_category: "Navigation",
    event_label: title,
  });
}

export function clickPokemon(id: string) {
  gtag("event", "click", {
    event_category: "Pokemon",
    event_label: id,
  });
}
