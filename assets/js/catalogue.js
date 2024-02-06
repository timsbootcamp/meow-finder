//'catalogue.js' holds all Javascript related to catalogue.html

$(document).ready(function () {
    loadCatalogueData(`${sortBreedName}: ${sortAscending}`);
});

// When the element with the ID "search" is clicked, the below function will run
$("#catalogueSort").on("click", function (event) {
    event.preventDefault();
    let sortOrder=$("#id_SortOrder").val();
    loadCatalogueData(sortOrder);
})


// Event Listener and wait for DOMContentLoaded event ie. when initial HTML has loaded
document.addEventListener('DOMContentLoaded', function() {

    // Populate the dropdown with cat breeds
    const catSortOrderDropdown = document.getElementById('id_SortOrder');
    sortOrderSelection.forEach(sortOrderSelection => {
      const option = document.createElement('option');
      option.value = sortOrderSelection;
      option.text = sortOrderSelection;
      catSortOrderDropdown.appendChild(option);
    });
})    


// Load Catalogue Data
async function loadCatalogueData(sortOrder) {
    // Wait until below statement runs and gets data populated
    let data = await getListOfAllCats_NinjaAPI();
    // 'data' variable is now populated with data

    let filteredSortedData = sortRecords(data, sortOrder);  
    displaySearchResults_DynamicHTML(data, false);
}


// When the element with the ID "search" is clicked, the below function will run
$("#search").on("click", function (event) {
    event.preventDefault();
    fetchDataFrom_NinjaAPI();
})

