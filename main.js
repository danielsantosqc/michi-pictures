// import { API_KEY } from "./secret_api-key.js";
// console.log(API_KEY);

// no me copies la api-key puedes crear rapidamente una en https://thecatapi.com/ y remplazarla 
// se un buen programador y no uses my key para tu priyecto, por favor
const API_KEY = "live_WOCCvj11GB4Vvoo5heQXZzge7WucFj8fh23eoQW1Zvi5EzSfvjtXghysw9EPLIww";

document.addEventListener("DOMContentLoaded", () => {
  loadRamdomMichis();
  loadFavouriteMichis();
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-refres .btn")) {
    console.log("refreshhhh");
    loadRamdomMichis();
  }
  if (e.target.matches(".card .btn-outline-primary")) {
    console.log("addFavoritos");
    console.log(e.target.id);
    addFavourites(e.target.id);
  }
  if (e.target.matches(".card .btn-outline-danger")) {
    console.log("deleteFavourites");
    console.log(e.target.id);
    deldeteFavourites(e.target.id);
  }
});

const HTTP_RESPONSE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

const spanError = document.getElementById("spanError");

//get tags-Random michis
const button = document.querySelector("button");

// aqui colocar el limite de las fots que quieres mostrar
const limit = 4;

//API and endpoints
const URL_RANDOM = `https://api.thecatapi.com/v1/images/search?`;
const URL_FAVOURITES = `https://api.thecatapi.com/v1/favourites?`;
const URL_FAVOURITES_DELETE = `https://api.thecatapi.com/v1/favourites/`;

const API_URL_RANDOM = URL_RANDOM + "limit=" + limit + "&api_key=" + API_KEY;
const API_URL_FAVOURITES = URL_FAVOURITES + "api_key=" + API_KEY;
// const API_URL_FAVOURITES_DELETE = (id) => {
//   URL_FAVOURITES_DELETE + id + "&api_key=" + API_KEY;
// };
const API_URL_FAVOURITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=${API_KEY}`;

// pinta las fotos en las cards randoms
function pintarCardsRandom(data) {
  console.log("paso por pintarCArds");
  console.log(data);

  //aqui indicamos donde se creara nuestros elementos de html
  const cards = document.getElementById("card-dinamicas-random");
  cards.textContent = "";

  // aqui indicamos el template que usaremos, que ya esta creado en html, pero aun no esta en uso
  const templateCard = document.getElementById(
    "template-card-random-cats"
  ).content;

  // crete fragment
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    // console.log(item.name);
    const clone = templateCard.cloneNode(true);
    clone.querySelector("h5").textContent = item.id;
    clone.querySelector("p").textContent = item.url;
    clone.querySelector(".card-img-top").setAttribute("src", item.url);
    clone.querySelector(".card-img-top").setAttribute("id", item.id);
    clone.querySelector(".btn").setAttribute("id", item.id);
    // guardamos en el fragment para evitar el reflow
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
}

// pinta las fotos en las cards favoritas
function pintarCardsFavourites(data) {
  console.log("paso por pintarCArds");
  console.log(data);

  //aqui indicamos donde se creara nuestros elementos de html
  const cards = document.getElementById("card-dinamicas-favourites");
  cards.textContent = "";

  // aqui indicamos el template que usaremos, que ya esta creado en html, pero aun no esta en uso
  const templateCard = document.getElementById(
    "template-card-favourites-cats"
  ).content;

  // crete fragment
  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    // console.log(item.name);
    const clone = templateCard.cloneNode(true);
    clone.querySelector("h5").textContent = "urlFav: " + item.id;
    clone.querySelector("p").textContent = item.image.url;
    clone.querySelector(".card-img-top").setAttribute("src", item.image.url);
    clone.querySelector(".btn").setAttribute("id", item.id);
    // guardamos en el fragment para evitar el reflow
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
}

//load random images
async function loadRamdomMichis() {
  button.disabled = true;
  const result = await fetch(API_URL_RANDOM);
  const data = await result.json();
  if (result.status == 200) {
    console.log("Random");
    console.log(data);
    pintarCardsRandom(data);
    button.disabled = false;
  } else {
    console.log("algo annda mall");
  }
}

//load favourite images
async function loadFavouriteMichis() {
  const result = await fetch(API_URL_FAVOURITES);
  const data = await result.json();

  if (result.status !== 200) {
    spanError.innerHTML = "mensaje:  " + result.status + "-" + data.message;
    console.log("algo annda mall");
  } else {
    console.log("Favoritos cargados");
    console.log(data);
    pintarCardsFavourites(data);
  }
}

//add favourites
async function addFavourites(idCat) {
  console.log(idCat);
  const result = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      image_id: idCat,
      // sub_id: "your-user-1234",
    }),
  });
  const data = await result.json();
  console.log("result");
  console.log(result);

  if (result.status !== 200) {
    spanError.innerHTML = "mensaje:  " + result.status + "-" + data.message;
    console.log(result.status);
    console.log("todo mal.. save.");
  } else {
    console.log("adicionado a favoritos ");
    console.log(data);
    loadFavouriteMichis();
  }
}

//add favourites
async function deldeteFavourites(idCat) {
  console.log("paso por deleteFav Function");
  console.log(idCat);
  const result = await fetch(API_URL_FAVOURITES_DELETE(idCat), {
    method: "DELETE",
  });
  const data = await result.json();

  if (result.status !== 200) {
    spanError.innerHTML = "mensaje:  " + result.status + "-" + data.message;
    console.log("algo salio mal");
    console.log(result.status);
  } else {
    console.log("delete correctamente");
    console.log(result.status);
    loadFavouriteMichis();
  }
}
