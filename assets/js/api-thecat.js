// 'api-thecat.js' holds all Javascript related to accessing 'theCatAPI'
const apiKey_TheCatAPI = "live_lu84yq93RYo14uTkB0E6v8sUCAVLkUuGhJ42BQJ9o4gEr1gBOa6nYPsks0QBPsXn";
const baseUrl_TheCatAPI = `https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1`;

// header settings for api request
const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": apiKey_TheCatAPI
});

// request settings
var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

// getting a random cat using API
function getRandomCat() {
  // returns data and request status
  return new Promise((resolve, reject) => {
    fetch(baseUrl_TheCatAPI, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // decodes the response in JSON format
        return response.json();
      })
      .then(data => {
        console.log(data);
        resolve(data);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

// asynchronous function that shows the cat
async function ShowRandomCat() {
  try {
    // clearing old pictures and descriptions
    $("#cat-fact-text").html("");
    $('#cat-fact-img').attr('src', "");

    // write a random cat into the cat variable from a function that returns a random cat
    let cat = await getRandomCat();

    // add a picture and description of a new random cat
    $("#cat-fact-text").html(cat[0].breeds[0].description);
    $('#cat-fact-img').attr('src', cat[0].url)
      .attr('width', '100')  // Adjust to the desired width
      .attr('height', 'auto');

  } catch (error) {
    //console.error("Error fetching data:", error);
    $("#cat-fact-text").html(error.message);
  }
}

// binding to a button when pressed
$("#randomCatFact").on("click", function (event) {
  event.preventDefault();
  // call the function show a random cat
  ShowRandomCat();
});