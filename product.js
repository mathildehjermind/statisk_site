console.log("loaded...");

document.addEventListener("DOMContentLoaded", () => {
  // Hent id fra URL: ?id=1163
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    console.warn("Intet id i URL’en (forventede ?id=...). Viser fallback-data.");
  }

  const produktUrl = `https://kea-alt-del.dk/t7/api/products/${id || 1163}`;

  // Peg på elementer i DIN HTML
  const imgEl = document.querySelector(".gallery img");
  const specs = document.querySelector(".info .specs");
  const ddEls = specs ? specs.querySelectorAll("dd") : [];
  const buyTitle = document.querySelector(".buy h3");
  const buyMeta = document.querySelector(".buy .meta");

  console.log("min url", produktUrl);

  getData();

  function getData() {
    fetch(produktUrl)
      .then((res) => res.json())
      .then((data) => show(data))
      .catch((err) => {
        console.error("Fejl ved hentning:", err);
        // Vis en venlig fallback, så siden ikke er tom
        if (imgEl) imgEl.alt = "Kunne ikke indlæse billede";
        if (buyTitle) buyTitle.textContent = "Produkt ikke fundet";
        if (buyMeta) buyMeta.textContent = "—";
      });
  }

  function show(data) {
    console.log("show data er", data);

    // ----- Billede (venstre) -----
    // Billedstien følger T7-konventionen: /images/webp/640/{id}.webp
    if (imgEl) {
      imgEl.src = `https://kea-alt-del.dk/t7/images/webp/640/${encodeURIComponent(data.id || id || 1163)}.webp`;
      imgEl.alt = data.productdisplayname || "Produktbillede";
    }

    // ----- Specs (midt) -----
    // Dine fire dd’er i rækkefølge: Model name, Brand, Color, Inventory number
    const brand = data.brandname || data.brand?.name || data.brand?.brandname || "Ukendt brand";

    const colour = data.basecolour || data.colour || data.color || data.variantname || "—";

    if (ddEls[0]) ddEls[0].textContent = data.productdisplayname || "—";
    if (ddEls[1]) ddEls[1].textContent = brand;
    if (ddEls[2]) ddEls[2].textContent = colour;
    if (ddEls[3]) ddEls[3].textContent = data.id || id || "—";

    // ----- Køb-boks (højre) -----
    if (buyTitle) buyTitle.textContent = data.productdisplayname || "Produkt";
    const articleType = data.articletype || data.articletype?.typename || data.category || "—";
    if (buyMeta) buyMeta.textContent = `${brand} | ${articleType}`;
  }
});
