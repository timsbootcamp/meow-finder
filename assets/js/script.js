// Ninja API related 
const apiKey_Ninja = 't9ihA37MLIJK/IZsDF2fTA==O1gy1IYS2kdrohvg';
const baseUrl_NinjaAPI = `https://api.api-ninjas.com/v1/cats`;



// When the element with the ID "search" is clicked, the below function will run
$("#search").on("click", function (event) {
    event.preventDefault();
  
    let data = fetchDataFrom_NinjaAPI();
    // // Read form input fields from HTML page and return object
    // let filtersSearch=readSearchFilterFieldsfromForm();
  
    // // Get list of cats from Ninja API then display them
    // let data = getListOfAllCats_NinjaAPI(filtersSearch);
})
  




async function fetchDataFrom_NinjaAPI() {
    try {
        // Wait until below statement runs and gets data populated
        let data = await getListOfAllCats_NinjaAPI();
        // 'data' variable is now populated with data
        console.log("");
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
