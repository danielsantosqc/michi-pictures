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

let countFav = 0;

const spanError = document.getElementById("spanError");

//get tags-Random michis
const button = document.querySelector("button");
const img1 = document.getElementById("imagen1");
const img2 = document.getElementById("imagen2");
const img3 = document.getElementById("imagen3");

//favourite add
const img4 = document.getElementById("imagen4");

//get tags-Favourite Michis
const imgFav = document.getElementById("imgFav");

//API and endpoints
const limit = 3;
const API_KEY =
  "live_WOCCvj11GB4Vvoo5heQXZzge7WucFj8fh23eoQW1Zvi5EzSfvjtXghysw9EPLIww";
const URL_RANDOM = `https://api.thecatapi.com/v1/images/search?`;
const URL_FAVOURITES = `https://api.thecatapi.com/v1/favourites?`;

const API_URL_RANDOM = URL_RANDOM + "limit=" + limit + "&api_key=" + API_KEY;
const API_URL_FAVOURITES =
  URL_FAVOURITES + "&api_key=" + API_KEY;

//load random images
async function loadRamdomMichis() {
  button.disabled = true;
  const result = await fetch(API_URL_RANDOM);
  const data = await result.json();

  img1.src = data[0].url;
  img1.setAttribute("id", data[0].id);

  img2.src = data[1].url;
  img2.setAttribute("id", data[1].id);

  img3.src = data[2].url;
  img3.setAttribute("id", data[2].id);

  console.log("Random");
  console.log(data);
  button.disabled = false;
}

//load favourite images
async function loadFavouriteMichis() {
  const result = await fetch(API_URL_FAVOURITES);
  const data = await result.json();
  console.log("Favoritos");
  console.log(data);
  if (result.status == 200) {
    imgFav.src = data[countFav].image.url;
    imgFav.setAttribute("id", data[countFav].id);
    countFav = countFav + 1;
    // console.log("Favoritos");
    // console.log(data);
  } else {
    imgFav.src =
      "https://media.istockphoto.com/vectors/the-cat-stole-the-computer-mouse-banner-error-404-vector-id1337405703";
  }
}

//add favourites
async function addFavourites() {
  const result = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      image_id: "9ccXTANkb",
      // sub_id: "your-user-1234",
    }),
  });
  const data = await result.json();
  console.log("result");
  console.log(result);
  spanError.innerHTML = "mensaje:  " + result.status + "-" + data.message;
  
  if (result.status == 200) {
    console.log("data");
    console.log(data);
  }else{
    console.log("todo mal.. save.");
    console.log(result);
  }
}

loadRamdomMichis();
loadFavouriteMichis();
