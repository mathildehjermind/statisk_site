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
