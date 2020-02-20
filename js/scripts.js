// Small helper function to grab element ids
let id = id => document.getElementById(id);

// Event listener that calls the "searchByCity" function when a user enters a city and clicks "Go!"
id("submit").addEventListener("click", () => searchByCity(id("citylabel").value));

// Function to search for events by city
function searchByCity(city) {
  // case where a user clicks "Go!" when they didn't enter anything in the text box
  alert("I'm not smart enough to help you find shows in " + city + " yet, my bad");
  // case where a user clicks "Go!" and there isn't a matching city

  // how are we going to handle users picking cities that exist in multiple states?
      // -- check if theres a library for selecting cities from a dropdown
      // --   that autocompletes with the state

}
