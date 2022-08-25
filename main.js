console.log("Hello");


function refresh() {
  const button = document.querySelector('button');
  let img = document.querySelector('img');
  button.disabled = true
  const URL = "https://api.thecatapi.com/v1/images/search";
  fetch(URL)
  .then(res => res.json())
  .then(data => {      
    img.src = data[0].url;
    console.log(data[0])
    button.disabled = false
  })  
}
refresh();


