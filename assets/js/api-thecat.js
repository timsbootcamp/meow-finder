//'api-thecat.js' holds all Javascript related to accessing 'theCatAPI'
const p = document.querySelector('#fact');
const img = document.querySelector('#main-image');

const apiKey_TheCatAPI = "live_lu84yq93RYo14uTkB0E6v8sUCAVLkUuGhJ42BQJ9o4gEr1gBOa6nYPsks0QBPsXn";
const baseUrl_TheCatAPI = `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1`;

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": apiKey_TheCatAPI
});

//request settings
var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

//functions for fact

//function that inserts a fact about a cat into HTML tag p
function updateHTML_RandomCatFact(fact) {
  p.textContent = fact;
}

//getting a fact about a cat using API
function getRandomCatFact() {
  fetch(baseUrl_TheCatAPI, requestOptions)
    .then(response => response.json())
    .then(result => updateHTML_RandomCatFact(result[0].breeds[0].description))
    .catch(error => console.log('error', error));
}

//functions for pictures

//function that inserts a cat image into HTML tag img
function updateHTML_RandomCatImage(linkImage) {
  img.src = linkImage;
  img.alt = "cat";
  //to clarify, perhaps you need to move this property to css
  img.width = 250;
}

//getting image a cat using API
function getRandomCatImage() {
  fetch(baseUrl_TheCatAPI, requestOptions)
    .then(response => response.json())
    .then(result => updateHTML_RandomCatImage(result[0].url))
    .catch(error => console.log('error', error));
}

//call the function to get a fact about the cat
getRandomCatImage()
//call the function to get the image of a cat
getRandomCatFact()