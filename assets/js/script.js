
//location of the picture star
const imageStar = "./assets/images/star.png";


// Dynamically populate in HTML - this function is shared between api-ninja.js and catalogue.js
function displaySearchResults_DynamicHTML(data, flag) {
    
    // Initalise Search Results
    $(".searchResults").empty("");
    
    let len = Object.entries(data).length

    if (flag) {
        // Initialise all boxes to blank
        len=Object.entries(data).length;
        for (var i = 0; i <= 19; i++) {
            let imageContainer = $(`#cat-breed${i + 1}-image`);
            imageContainer.attr('src', "");
            imageContainer.attr('alt', '');
            $(`#cat-breed${i+1}`).addClass("hide");
        }
    }

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

        //a function that inserts the required number of stars into an html element
        addStarDynamicToElement($(`#playfulness-stars${i + 1}`), data[i].playfulness);
        addStarDynamicToElement($(`#pet-friendly-stars${i + 1}`), data[i].other_pets_friendly);
        addStarDynamicToElement($(`#child-friendly-stars${i + 1}`), data[i].children_friendly);
        addStarDynamicToElement($(`#family-friendly-stars${i + 1}`), data[i].family_friendly);

        // Remove hide class so image is visible
        $(`#cat-breed${i+1}`).removeClass("hide");
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