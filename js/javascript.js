var APIkey = "9ecbdf9d0dc12db2360cb9d8bc558329";
// // variables
// // var search = document.querySelector('.search-button');
var search = $("#city-form");
var searchCity = $("#search-city");
var currentCity = $("#current-city");
var tempCurrent = $("#current-temp");
var humidityCurrent = $("#current-humidity");
var curretWind = $("#current-wind");
var currentUV = $("#currentUv");
var historyCityBtn = $("#history-button")
var fiveDay = $("#future-weather");
// display current weather

// function weatherDisplay(event) {
//     event.preventDefault();

//   console.log("text here");
//   var cityName = searchCity.val().trim();
//   console.log(cityName);
//   if (cityName !== "") {
//     // Do a fetch function for the open weather API with the city name
//     var currentWeatherUrl =
//       "https://api.openweathermap.org/data/2.5/weather?q=" +
//       cityName +
//       "&appid=" +
//       APIkey;
//     fetch(currentWeatherUrl)
//       .then(function (response) {
//           return response.json();
//       })
//       .then(function (data) {
//         // Make sure to look at the response in the console and read how 404 response is structured.
//         console.log(data);
//       });
//   }
// }

function uvIndex (lat, lon) {
    var uvURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude={minutely,hourly,daily}&appid=' + apiKey;
    
    fetch(uvIndex)
    .then(function(response) {
    return response.json();
    })
    .then(function (data) {
        console.log('');
        console.log(data);

        var UVdata = data.current.uvi;
        var UVresult = parseFloat(UVreadingData);
        displayUV = $('<span class="py-2 px-4 rounded">${UVresult}</span>');
        currentUV.text('UV Index: ' + ' ');
        currentUV.append(displayUV);

        if (UVresult <= 1.0) {
            displayUV.addClass('bg-success text-black');

        } else if (UVresult > 2.0 && UVresult < 6.0) {
            displayUV.addClass('bg-warning text-black');
        } else if (UVresult > 8.0 && UVresult < 10.9) {
            
        }

    })
}

// clears the search history

// passwordBtnEl.on('click', function () {
//     var newPassword = passwordGenerator(15);
//     passwordDisplayEl.text(newPassword);
//   });

// Displays the search history



search.on('submit', function (event){
    event.preventDefault();
    console.log(searchCity);
    weatherDisplay();
 });

