import "./load-ga";

declare var ga: Function;

export function clickNav(title: string) {
  ga("send", "event", "Navigation", "click", title);
}
