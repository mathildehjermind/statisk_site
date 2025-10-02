console.log("loaded...");

const id = new URLSearchParams(window.location.search).get("id");
console.log("HVAD ER ID", id);
const productUrl = `https://kea-alt-del.dk/t7/api/products/${id}`;
const productcontainer = document.querySelector("#productContainer");

getData();

function getData() {
  console.log("Henter produkter fra:", productUrl);
  fetch(productUrl)
    .then((res) => res.json())
    .then((data) => show(data));
}

function show(data) {
  console.log("shows data er", data);

  getData();

  function getData() {
    console.log("getData...");
    fetch(productUrl).then((res) => res.json().then((data) => show(data)));
  }

  productcontainer.innerHTML = `
  <section class="produkt_side">
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="top" class="produkt_billede">
<div class="produkt_info">
    <h2>${data.productdisplayname}</h2>
    <p><strong>Brand:</strong>${data.brandname}</p>
    <p><strong>Price:</strong>${data.price} ,-</p>
    <label for="size">Choose a size</label>
                <select name="size" id="size">
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                </select>
    <button class="add_to_basket">Add to Basket</button>    
    </div>      
</section>
    `;
}

//   // Peg på elementer i DIN HTML
//   const imgEl = document.querySelector(".gallery img");
//   const specs = document.querySelector(".info .specs");
//   const ddEls = specs ? specs.querySelectorAll("dd") : [];
//   const buyTitle = document.querySelector(".buy h3");
//   const buyMeta = document.querySelector(".buy .meta");

//   console.log("min url", produktUrl);

//   getData();

//   function getData() {
//     fetch(produktUrl)
//       .then((res) => res.json())
//       .then((data) => show(data))
//       .catch((err) => {
//         console.error("Fejl ved hentning:", err);
//         // Vis en venlig fallback, så siden ikke er tom
//         if (imgEl) imgEl.alt = "Kunne ikke indlæse billede";
//         if (buyTitle) buyTitle.textContent = "Produkt ikke fundet";
//         if (buyMeta) buyMeta.textContent = "—";
//       });
//   }

//   function show(data) {
//     console.log("show data er", data);

//     // ----- Billede (venstre) -----
//     // Billedstien følger T7-konventionen: /images/webp/640/{id}.webp
//     if (imgEl) {
//       imgEl.src = `https://kea-alt-del.dk/t7/images/webp/640/${encodeURIComponent(data.id || id || 1163)}.webp`;
//       imgEl.alt = data.productdisplayname || "Produktbillede";
//     }

//     // ----- Specs (midt) -----
//     // Dine fire dd’er i rækkefølge: Model name, Brand, Color, Inventory number
//     const brand = data.brandname || data.brand?.name || data.brand?.brandname || "Ukendt brand";

//     const colour = data.basecolour || data.colour || data.color || data.variantname || "—";

//     if (ddEls[0]) ddEls[0].textContent = data.productdisplayname || "—";
//     if (ddEls[1]) ddEls[1].textContent = brand;
//     if (ddEls[2]) ddEls[2].textContent = colour;
//     if (ddEls[3]) ddEls[3].textContent = data.id || id || "—";

//     // ----- Køb-boks (højre) -----
//     if (buyTitle) buyTitle.textContent = data.productdisplayname || "Produkt";
//     const articleType = data.articletype || data.articletype?.typename || data.category || "—";
//     if (buyMeta) buyMeta.textContent = `${brand} | ${articleType}`;
//   }
// });
