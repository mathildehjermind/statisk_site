const productListContainer = document.querySelector(".product_list_container");

const urlParams = new URLSearchParams(window.location.search);
const season = urlParams.get("seasons");
console.log("season: ", season);
console.log("productListContainer: ", productListContainer);

const productUrl = season ? `https://kea-alt-del.dk/t7/api/products?season=${season}` : "https://kea-alt-del.dk/t7/api/products";

getData();

function getData() {
  console.log("Henter produkter fra:", productUrl);
  fetch(productUrl)
    .then((res) => res.json())
    .then((data) => showProducts(data));
}

function showProducts(products) {
  console.log("products", products);
  productListContainer.innerHTML = ""; // ryd container

  products.forEach((product) => {
    const soldOutClass = product.soldout ? "soldout" : "";

    let priceHTML = `<p class="price">DKK ${product.price},-</p>`;
    if (product.discount) {
      const newPrice = Math.round(product.price - (product.price * product.discount) / 100);
      priceHTML = `
        <p class="price">
          <span class="prev">Prev. DKK ${product.price},-</span><br>
          Now DKK ${newPrice},-
          <span class="discount">-${product.discount}%</span>
        </p>`;
    }

    productListContainer.innerHTML += `
      <article class="product_card ${soldOutClass}" >
        
        <div class="imageContainer">  
            
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
            <p>SOLD OUT</p>
        </div>
        <div>
          
        </div>
        <h2>${product.productdisplayname}</h2>
        <p class="brand">${product.articletype} | ${product.brandname}</p>
        ${priceHTML}
        <a href="produkt.html?id=${product.id}">Read More</a>
      </article>
    `;
  });
}
// ${product.soldout ? '<div class="soldout-label">Sold Out</div> ' : ""}
//SOLD OUT//
