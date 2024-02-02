//location of the picture star
const imageStar = "./assets/images/star.png";

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
        $(`#cat-breed${i + 1}`).text(data[i].name);
        $(`#playfulness-trait${i + 1}`).text("Playfulness");
        $(`#child-friendly-trait${i + 1}`).text("Child-Friendly");
        $(`#family-friendly-trait${i + 1}`).text("Family-Friendly");
        $(`#pet-friendly-trait${i + 1}`).text("Pet-Friendly");

        // Handling image 
        let imageContainer = $(`#cat-breed${i + 1}-image`);
        imageContainer.attr('src', data[i].image_link);
        imageContainer.attr('alt', 'Cat Breed');

        //a function that inserts the required number of stars into an html element
        addStarDynamicToElement($(`#playfulness-stars${i + 1}`), data[i].playfulness);
        addStarDynamicToElement($(`#pet-friendly-stars${i + 1}`), data[i].other_pets_friendly);
        addStarDynamicToElement($(`#child-friendly-stars${i + 1}`), data[i].children_friendly);
        addStarDynamicToElement($(`#family-friendly-stars${i + 1}`), data[i].family_friendly);
    }
};

//the function inserts the required number of stars into the html element
function addStarDynamicToElement(htmlElement, noStars) {
    for (let i = 0; i < noStars; i++) {
        //creates an img element
        let starObj = document.createElement('img');
        //location of the picture
        starObj.src = imageStar;
        starObj.alt = "star";
        starObj.width = 20;
        //insert an image into the passed html element
        htmlElement.append(starObj);
    }
}