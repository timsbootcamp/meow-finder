//'catalogue.js' holds all Javascript related to catalogue.html

$(document).ready(function () {
    loadCatalogueData();
});


// Load Catalogue Data
async function loadCatalogueData() {
    // Wait until below statement runs and gets data populated
    let data = await getListOfAllCats_NinjaAPI();
    // 'data' variable is now populated with data

    //updateCatalogue_HTML_Dynamically(data);
    displaySearchResults_DynamicHTML(data, false);
}
