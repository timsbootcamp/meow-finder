//'api-thecat.js' holds all Javascript related to accessing 'theCatAPI'
const div = document.querySelector('#');

const apiKey_TheCatAPI = "live_lu84yq93RYo14uTkB0E6v8sUCAVLkUuGhJ42BQJ9o4gEr1gBOa6nYPsks0QBPsXn";
const baseUrl_TheCatAPI = `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1`;

const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": apiKey
});

//request settings
var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

//function that inserts a fact about a cat into HTML
function updateHTML_RandomCatFact(fact) {
  let p = document.createElement('p');
  p.textContent = fact;
  div.append(p);
}

//getting a fact about a cat using API
function getRandomCatFact() {
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => updateHTML_RandomCatFact(result[0].breeds[0].description))
    .catch(error => console.log('error', error));
}