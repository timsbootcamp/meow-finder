// Constant for key for local storage
const localStorageKey_meowFinder= "meow-finder";

//location of the picture star
const imageStar = "./assets/images/star.png";

// Link to meow sound file
const soundFile_Meow = "assets/sfx/meow01.mp3";


// Dropdown menu search form
const catBreeds = [
'', 'Abyssinian', 'Aegean', 'American Bobtail', 'American Curl', 'American Shorthair',
'American Wirehair', 'Aphrodite Giant', 'Arabian Mau', 'Asian', 'Australian Mist',
'Balinese', 'Bambino', 'Bengal Cats', 'Birman', 'Bombay', 'Brazilian Shorthair',
'British Longhair', 'British Shorthair', 'Burmese', 'Burmilla'
];


function displaySearchResults_DynamicHTML(data, viaSearchPage) {

    let len = Object.entries(data).length
    let catTitle="";

    if (viaSearchPage){
        // Play Sound file when only searching
        playSoundFile(soundFile_Meow);
        if (len === 1) {
            catTitle="cat";
        }
        
        else {
            catTitle="cats";
        }            
        
        $("#no-cat-results").text(`The search returned ${len} ${catTitle} that matched the specified criteria`);
    }

    $('#catalogue-cards').empty("")
    var catalogueCards = $('#catalogue-cards');


    for (var i = 0; i <= len - 1; i++) {      
        var catalogueCards = document.getElementById('catalogue-cards');
        var cardElement = createCatCard(i+1)
        catalogueCards.appendChild(cardElement);
        
        $(`#cat-breed-title${i + 1}`).text(data[i].name + " (" + data[i].origin + ")");
        $(`#playfulness-trait${i + 1}`).text("Playfulness");
        $(`#child-friendly-trait${i + 1}`).text("Child-Friendly");
        $(`#family-friendly-trait${i + 1}`).text("Family-Friendly");
        $(`#pet-friendly-trait${i + 1}`).text("Pet-Friendly");
        $(`#weight-trait${i + 1}`).text("Weight");
        $(`#life-traits${i + 1}`).text("Life Expectancy");

        $(`#min-weight-result${i + 1}`).text(`${data[i].min_weight}kg to `);
        $(`#max-weight-result${i + 1}`).text(`${data[i].max_weight}kg`);

        $(`#min-life-result${i + 1}`).text(`${data[i].min_life_expectancy} to `);
        $(`#max-life-result${i + 1}`).text(`${data[i].max_life_expectancy}`);
        
        //min-life-result        

        // // Handling image 
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
    // cleaning stars before adding
    htmlElement.empty();
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


function createCatCard(i) {
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("col");

    cardDiv.innerHTML = `
    <div class="card h-100">
        <img id="cat-breed${i}-image" class="card-img-top">
        <div class="card-body">
            <h5 id="cat-breed-title${i}" class="card-title"></h5>
            <div class="card-text">
                <div class="description">
                    <p id="weight-trait${i}" class="trait"></p> 
                    <div class="results"><p id="min-weight-result${i}">-</p><p></p><p id="max-weight-result${i}"></div> 
                </div>
                <div class="description">
                    <p id="life-traits${i}" class="trait"></p> 
                    <div class="results"><p id="min-life-result${i}">-</p><p></p><p id="max-life-result${i}"></div> 
                </div>
                <div class="description">
                    <p id="playfulness-trait${i}" class="trait"></p> 
                    <p id="playfulness-stars${i}" class="stars"></p> 
                </div>
                <div class="description">
                    <p id="pet-friendly-trait${i}" class="trait"></p> 
                    <p id="pet-friendly-stars${i}" class="stars"></p> 
                </div>
                <div class="description">
                    <p id="child-friendly-trait${i}" class="trait"></p> 
                    <p id="child-friendly-stars${i}" class="stars"></p> 
                </div>
                <div class="description">
                    <p id="family-friendly-trait${i}" class="trait"></p> 
                    <p id="family-friendly-stars${i}" class="stars"></p> 
                </div>                
            </div>
        </div>
    </div>`;

    return cardDiv;
}


// Asynchronous function to accessing data from Ninja API
async function fetchDataFrom_NinjaAPI() {
    try {
  
      // Wait until below statement runs and gets data populated
      let data = await getListOfAllCats_NinjaAPI();
      // 'data' variable is now populated with data
  
      // Read form input fields from HTML page and return object
      let filtersSearch = readSearchFilterFieldsfromForm();

      writeToLocalStorage(filtersSearch);

      // The data returned from the API and the user search filtering parameters are passed
      let filteredData =  filterRecords(data, filtersSearch)
  
      // Display data
      displaySearchResults_DynamicHTML(filteredData, true);
  

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  // Play sound file (url is passed to function)
function playSoundFile(soundFileUrl) {
    var audio = new Audio(soundFileUrl);
    audio.play();
}
