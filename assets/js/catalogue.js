//location of the picture star
const imageStar = "./assets/images/star.png";

$(document).ready(function () {

    //loadCatalogueData();
    var queryParams = getQueryParams();
    loadCatalogueData(queryParams);

    // Access the passed data
    console.log(queryParams.key1); // Output: value1    

    
});


// Load Catalogue Data
async function loadCatalogueData(filtersSearch) {
    // Wait until below statement runs and gets data populated
    let data = await getListOfAllCats_NinjaAPI();
     
    // The data returned from the API and the user search filtering parameters are passed
    let filteredData = filterRecords(data, filtersSearch)

    // 'data' variable is now populated with data
    updateCatalogue_HTML_Dynamically(filteredData);
}


// Dynamically populate in HTML
function updateCatalogue_HTML_Dynamically(data) {
    
    // NEW CODE - BEGIN
    for (var i = 0; i <= 19; i++) {
        let imageContainer = $(`#cat-breed${i + 1}-image`);
        imageContainer.attr('src', "");
        imageContainer.attr('alt', '');
        //$(`#cat-breed${i+1}`).addClass("hide");
        $(`#cat-breed${i+1}-head`).addClass("hide");
    } 
    // NEW CODE - END


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
        
        // // Remove hide class so image is visible
        //$(`#cat-breed${i+1}`).removeClass("hide");
        $(`#cat-breed${i+1}-head`).removeClass("hide");

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


// Read query parameters from Search form that was passed
// function getQueryParams() {
//     var params = {};
//     var queryString = window.location.search.substring(1);
//     var vars = queryString.split("&");
//     for (var i = 0; i < vars.length; i++) {
//       var pair = vars[i].split("=");
//       params[pair[0]] = decodeURIComponent(pair[1]);
//     }
//     return params;
// }

function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const vars = queryString.split("&");
    
    vars.forEach(varPair => {
      const [key, value] = varPair.split("=");
      params[key] = decodeURIComponent(value);
    });
    
    return params;
  }