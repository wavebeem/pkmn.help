// @ts-nocheck

// This is basically copied from GA's documentation, and I don't feel like
// figuring out how to make TS happy with the global magic its doing...
export function initGA() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    dataLayer.push(arguments);
  };
  gtag("js", new Date());
  // Don't do analytics on localhost or deploy previews...
  if (
    window.location.hostname === "pkmn.help" ||
    window.location.hostname === "www.pkmn.help"
  ) {
    gtag("config", "UA-52704502-5", {
      send_page_view: false,
    });
  }
  // Show GA calls in the console for debugging
  else {
    window.gtag = console.info.bind(console, "[ga]");
  }
}
