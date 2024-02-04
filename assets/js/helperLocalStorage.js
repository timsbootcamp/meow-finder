function writeToLocalStorage(data) {

    // Converts the calendarData array to the JSON notation that the value represents
    var jsonData = JSON.stringify(data);
  
    // Write to localstorage on key
    localStorage.setItem(localStorageKey_meowFinder, jsonData);
}


// Read from local storage based on key defined in variable: 'localStorageKey_WeatherDashboard'
function readFromLocalStorage() {

    var storedData = localStorage.getItem(localStorageKey_meowFinder);

    if (storedData) {
        return JSON.parse(storedData);        
    }
}
