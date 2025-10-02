console.log("Seasons loaded...");
const categoriContainer = document.querySelector(".category_list_container");
// categoriContainer.innerHTML = "<ul>";

getData("https://kea-alt-del.dk/t7/api/seasons");
function getData(url) {
  fetch(url).then((res) => res.json().then((data) => showSeasons(data)));
}

function showSeasons(seasons) {
  console.log("showCategories2 loaded...", seasons);

  seasons.forEach((seasons) => {
    console.log("Loopet", seasons);

    categoriContainer.innerHTML += `
    <a class="category" href="produktliste.html?seasons=${seasons.season}">${seasons.season}</a>
    `;
  });
}
// categoriContainer.innerHTML = "<ul>";
