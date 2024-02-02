$(document).ready(function () {
        loadCatalogueData();
    
});




// Load Catalogue Data
async function loadCatalogueData() {
    // Wait until below statement runs and gets data populated
    let data = await getListOfAllCats_NinjaAPI();
    // 'data' variable is now populated with data

    updateCatalogue_HTML_Dynamically(data);
}


// Dynamically populate in HTML
function updateCatalogue_HTML_Dynamically(data) {
    let len = Object.entries(data).length

    for (var i = 0; i <= len - 1; i++) {
        $(`#cat-breed-title${i + 1}`).text(data[i].name);
        $(`#playfulness-trait${i + 1}`).text("Playfulness");
        $(`#child-friendly-trait${i + 1}`).text("Child-Friendly");
        $(`#family-friendly-trait${i + 1}`).text("Family-Friendly");
        $(`#pet-friendly-trait${i + 1}`).text("Pet-Friendly");

        // Handling image 
        let imageContainer = $(`#cat-breed${i + 1}-image`);
        imageContainer.attr('src', data[i].image_link);
        imageContainer.attr('alt', 'Cat Breed');
        
    }
};