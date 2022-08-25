console.log("Hello");
const limit = 3;
const API_URL = `https://api.thecatapi.com/v1/images/search?limit=${limit}`;

async function refresh() {
  const button = document.querySelector("button");
  let img1 = document.getElementById("image1");
  let img2 = document.getElementById("image2");
  let img3 = document.getElementById("image3");
  button.disabled = true;
  const result = await fetch(API_URL);
  const data = await result.json();
  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
  console.log(data[0]);
  button.disabled = false;
}
refresh();
