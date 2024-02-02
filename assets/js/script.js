// Ninja API related 
const apiKey_Ninja = 't9ihA37MLIJK/IZsDF2fTA==O1gy1IYS2kdrohvg';
const baseUrl_NinjaAPI = `https://api.api-ninjas.com/v1/cats`;



// When the element with the ID "search" is clicked, the below function will run
$("#search").on("click", function (event) {
    event.preventDefault();
  
    let data = fetchDataFrom_NinjaAPI();
})


// This function takes as parameters : the data returned from the API and the user search filtering parameters
// For each field, we are checking to see if user has specified any search filtering and if so then filter the data
function filterRecords(dataOrig, parameters) {

    // copy data to a new variable so we can always see what is input and what is being filtered also
    let data = dataOrig;
  
    // Name Cat Breed
    let filteredData = [];
    if (parameters && parameters.NameCatBreed !== undefined && parameters.NameCatBreed !== '') {
      data.forEach(cat => {
        if (cat.name === parameters.NameCatBreed) {
          filteredData.push(cat); // add to array
        }
      });
      data = filteredData; // initalise variable
    }
  
    // Min Weight
    filteredData = [];
    if (parameters && parameters.MinWeight !== undefined && parameters.MinWeight !== '') {
      data.forEach(cat => {
        if (Number(cat.min_weight) >= Number(parameters.MinWeight)) {
          filteredData.push(cat); // add to array
        }
      });
      data = filteredData; // initalise variable
    }
  
    // Max Weight
    filteredData = [];
    if (parameters && parameters.MaxWeight !== undefined && parameters.MaxWeight !== '') {
      data.forEach(cat => {
        if (Number(cat.max_weight) <= Number(parameters.MaxWeight)) {
          filteredData.push(cat); // add to array
        }
      });
      data = filteredData; // initalise variable
    }
  
    // Min Life Expectancy
    filteredData = [];
    if (parameters && parameters.MinLifeExpectancy !== undefined && parameters.MinLifeExpectancy !== '') {
      data.forEach(cat => {
        if (Number(cat.min_life_expectancy) >= Number(parameters.MinLifeExpectancy)) {
          filteredData.push(cat); // add to array
        }
      });
      data = filteredData; // initalise variable
    }
  
    // Max Life Expectancy
    filteredData = [];
    if (parameters && parameters.MaxLifeExpectancy !== undefined && parameters.MaxLifeExpectancy !== '') {
      data.forEach(cat => {
        if (Number(cat.max_life_expectancy) <= Number(parameters.MaxLifeExpectancy)) {
          filteredData.push(cat); // add to array
        }
      });
      data = filteredData; // initalise variable
    }
  
    // Family Friendly
    filteredData = [];
    if (parameters && parameters.FamilyFriendly) {
      data.forEach(cat => {
        if (Number(cat.family_friendly) >= 4) {
          filteredData.push(cat); // add to array
        }
      });
      data = filteredData; // initalise variable
    }
  
    // Playfulness
    filteredData = [];
    if (parameters && parameters.Playfulness) {
      data.forEach(cat => {
        if (cat.playfulness >= 3) {
          filteredData.push(cat); // add to array
        }
      });
      data = filteredData; // initalise variable
    }
  
    // Friendly with other pets
    filteredData = [];
    if (parameters && parameters.FriendlyWithOtherPets) {
      data.forEach(cat => {
        if (Number(cat.other_pets_friendly) >= 4) {
          filteredData.push(cat); // add to array
        }
      });
      data = filteredData; // initalise variable
    }
  
    // Children Friendly
    filteredData = [];
    if (parameters && parameters.ChildrenFriendly) {
      data.forEach(cat => {
        if (cat.children_friendly >= 5) {
          filteredData.push(cat); // add to array
        }
      });
      data = filteredData; // initalise variable
    }
  
    // DEBUG LOGGING
    // data.forEach(cat => {
    //   console.log(cat.max_life_expectancy)  
    // });
  
    return data;
  }
  

// Read form input fields from HTML page and return object
function readSearchFilterFieldsfromForm() {
    return {
      NameCatBreed: $("#id_NameCatBreed").val(),
      MinWeight: $("#id_MinWeight").val(),
      MaxWeight: $("#id_MaxWeight").val(),
      MinLifeExpectancy: $("#id_MinLifeExpectancy").val(),
      MaxLifeExpectancy: $("#id_MaxLifeExpectancy").val(),
      FamilyFriendly: $("#id_FamilyFriendly").prop("checked"),
      Playfulness: $("#id_Playfulness").prop("checked"),
      FriendlyWithOtherPets: $("#id_FriendlyWithOtherPets").prop("checked"),
      ChildrenFriendly: $("#id_ChildrenFriendly").prop("checked")
    }
}
  




async function fetchDataFrom_NinjaAPI() {
    try {
  
      // Wait until below statement runs and gets data populated
      let data = await getListOfAllCats_NinjaAPI();
      // 'data' variable is now populated with data
  
      // Read form input fields from HTML page and return object
      let filtersSearch = readSearchFilterFieldsfromForm();
  
      // The data returned from the API and the user search filtering parameters are passed
      let filteredData = filterRecords(data, filtersSearch)
  
      // Display data
      displaySearchResults_DynamicHTML(filteredData);
  
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  


function getListOfAllCats_NinjaAPI() {
    return new Promise((resolve, reject) => {
        const params = new URLSearchParams();
        params.append('min_weight', 1);

        // Join base URL with query searchParameters
        let url = `${baseUrl_NinjaAPI}?${params.toString()}`;

        // fetch data from API via url and api key
        fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey_Ninja,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // The data returned from the API is passed
                resolve(data); // Resolve the promise with the fetched data
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error); // Reject the promise with the error
            });
    });
}


// Display search results on html page using dynamic html
  function displaySearchResults_DynamicHTML(data) {
    // Initalise Search Results
    $(".searchResults").empty("");
    // Parse each Cat from array
    $.each(data, function (index, item) {
      let lineData = item.name + ", Min Weight:" + item.min_weight + ", Max Weight:" + item.max_weight;
      lineData = lineData + ", Min Life:" + item.min_life_expectancy + ", Max Life:" + item.max_life_expectancy;
      lineData = lineData + ", Family Friendly:" + item.family_friendly + ", Playful:" + item.playfulness;
      lineData = lineData + ", Friendly with other pets:" + item.other_pets_friendly + ", Children Friendly:" + item.children_friendly;
      $(".searchResults").append($("<div>").append("<span>").text(lineData));
      // Handling image
      //
      let imageContainer = $(`#cat-breed${i + 1}-image`);
      imageContainer.attr('src', data[i].image_link);
      imageContainer.attr('alt', 'Cat Breed');
      // $("#cat-breed1").removeClass("hide");
    });
    $.each(data, function (index, item) {
      //cat-breed1 "col hide"
  });
  }