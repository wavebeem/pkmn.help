declare const gtag: (...args: any[]) => void;

export function clickPokemon(id: string) {
  gtag("event", "click", {
    event_category: "Pokemon",
    event_label: id,
  });
}

export function sendPageView() {
  gtag("event", "page_view", {
    page_title: document.title,
    page_location: document.location.href,
    page_path: document.location.pathname,
  });
}
