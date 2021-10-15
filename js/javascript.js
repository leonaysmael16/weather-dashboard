var APIkey = "9ecbdf9d0dc12db2360cb9d8bc558329";
// variables
// var search = document.querySelector('.search-button');
var search = $("#city-form");
// var searchCity = document.querySelector('.search-city');
var searchCity = $("#search-city");
var currentCity = document.querySelector(".current-city");
var tempCurrent = document.querySelector(".current-temp");
var humidityCurrent = document.querySelector(".Humidity");
var curretWind = document.querySelector(".wind-speed");
var currentUV = document.querySelector(".uv-index");
var fiveDay = document.querySelector(".future-weather");
// display current weather

function weatherDisplay(event) {

//   console.log("text here");
  var cityName = searchCity.val().trim();
  console.log(cityName);
  if (cityName !== "") {
    // Do a fetch function for the open weather API with the city name
    var currentWeatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      APIkey;
    fetch(currentWeatherUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
        // Make sure to look at the response in the console and read how 404 response is structured.
        console.log(data);
      });
  }
}

// clears the search history

// passwordBtnEl.on('click', function () {
//     var newPassword = passwordGenerator(15);
//     passwordDisplayEl.text(newPassword);
//   });

search.on('submit', function (event){
    event.prevenDefault();
    console.log("here");
//     weatherDisplay();
 });
