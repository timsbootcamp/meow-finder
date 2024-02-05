//'searchCat.js' holds all Javascript related to search.html


// When the element with the ID "search" is clicked, the below function will run
$("#search").on("click", function (event) {
    event.preventDefault(); 
    fetchDataFrom_NinjaAPI();
})


// document.addEventListener('DOMContentLoaded', function() {

//   const catBreeds = [
//     'Abyssinian', 'Aegean', 'American Bobtail', 'American Curl', 'American Shorthair',
//     'American Wirehair', 'Aphrodite Giant', 'Arabian Mau', 'Asian', 'Australian Mist',
//     'Balinese', 'Bambino', 'Bengal Cats', 'Birman', 'Bombay', 'Brazilian Shorthair',
//     'British Longhair', 'British Shorthair', 'Burmese', 'Burmilla'
//   ];

//   const catBreedDropdown = document.getElementById('catBreedDropdown');
//   catBreeds.forEach(breed => {
//     const option = document.createElement('option');
//     option.value = breed;
//     option.text = breed;
//     catBreedDropdown.appendChild(option);
//   });
// });



// Event Listemer and wait for DOMContentLoaded event ie. when initial HTML has loaded
document.addEventListener('DOMContentLoaded', function() {
     
   // Read from Local Storage
    let settingsData = readFromLocalStorage();
   
    // Load Search form with criteria from last search execution
    if (settingsData) {
        $("#id_NameCatBreed").val(settingsData.NameCatBreed);
        $("#id_MinWeight").val(settingsData.MinWeight);
        $("#id_MaxWeight").val(settingsData.MaxWeight);   

        $("#id_MinLifeExpectancy").val(settingsData.MinLifeExpectancy);   
        $("#id_MaxLifeExpectancy").val(settingsData.MaxLifeExpectancy);   

        if (settingsData.FamilyFriendly) {
          $("#id_FamilyFriendly").prop("checked", true);   
        }
        else {
          $("#id_FamilyFriendly").prop("checked", false);;   
        }
        
        if (settingsData.Playfulness) {
          $("#id_Playfulness").prop("checked", true);   
        }
        else {
          $("#id_Playfulness").prop("checked", false);;   
        }

        if (settingsData.FriendlyWithOtherPets) {
          $("#id_FriendlyWithOtherPets").prop("checked", true);   
        }
        else {
          $("#id_FriendlyWithOtherPets").prop("checked", false);;   
        }

        if (settingsData.ChildrenFriendly) {
          $("#id_ChildrenFriendly").prop("checked", true);   
        }
        else {
          $("#id_ChildrenFriendly").prop("checked", false);;   
        }
      }   
      


    // Populate the dropdown with cat breeds
    const catBreedDropdown = document.getElementById('id_NameCatBreed');
    catBreeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed;
      option.text = breed;
      catBreedDropdown.appendChild(option);
    });

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
    