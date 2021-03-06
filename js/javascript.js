var APIkey = "9ecbdf9d0dc12db2360cb9d8bc558329";
// // variables
// // var search = document.querySelector('.search-button');
// var city = '';
var search = $("#city-form");
var searchCity = $("#search-city");
var currentDate = $("#current-day");
var currentCity = $("#current-city");
var currentIcon = $("#current-icon");
var currentDescription = $("#current-description");
var tempCurrent = $("#current-temp");
var humidityCurrent = $("#current-humidity");
var curretWind = $("#current-wind");
var currentUV = $("#currentUv");
var historyCityBtn = $("#history-button");
var searchHistory = $('#search-history')
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

// display current weather forecast

function currentForecast(searchCity) {
    var currentWeatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchCity +
      "&appid=" +
      APIkey;

      fetch(currentWeatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data)

        var forecastIcon = data.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
        // var forecastImg = $('<img>');
        $('#current-icon').attr('src', iconURL);

        

        var forecastDescription = data.weather[0].description;
        currentDescription.text(forecastDescription);
        currentDescription.css('font-style', 'bold');

        currentDate.text(moment().format('dddd, l'));
        currentDate.css('font-weight', 'bold');

        var tempResult = data.main.temp;
        tempCurrent.text('Temp: ' + ' ' + Math.floor(tempResult) + '???');

        var windResult = data.wind.speed;
        curretWind.text('Wind: ' + ' ' + Math.floor(windResult) + 'MPH');

        var humidityResult = data.main.humidity;
        humidityCurrent.text('Humidity:' + ' ' + Math.floor(humidityResult) + '%');
        
        uvIndex(data.coord.lat, data.coord.lon);
        getFiveDayForecast(searchCity);


      })
}

// fetching UV index
function uvIndex (lat, lon) {
    var uvURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + 
    lat + 
    '&lon=' + 
    lon + 
    '&exclude={minutely,hourly,daily}&appid=' + 
    APIkey;
    
    fetch(uvURL)
    .then(function(response) {
    return response.json();
    })
    .then(function (data) {
        console.log('');
        // console.log(data);

        var UVdata = data.current.uvi;
        var UVresult = parseFloat(UVdata);
        displayUV = $(`<span class="py-2 px-4 rounded">${UVresult}</span>`);
        currentUV.text('UV Index: ' + ' ');
        currentUV.append(displayUV);

        if (UVresult <= 1.0) {
            displayUV.addClass('bg-success text-black');

        } else if (UVresult > 2.0 && UVresult < 6.0) {
            displayUV.addClass('bg-warning text-black');
        } else if (UVresult > 8.0 && UVresult < 10.9) {
            displayUV.addClass('bg-danger text-black');

        }
        else {
            displayUV.css({'background-color': 'blue', 'color': 'black'});
        };

    });
}
// function to get weather forecast
function getFiveDayForecast (searchCity) {
    var fiveDayUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchCity +
      '&units=imperial' +
      "&appid=" +
      APIkey;

      fetch(fiveDayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var forecastArray = data.list;
        const today = moment().format('L');
        for (let index = 8; index < forecastArray.length; index += 8) {
            const day = forecastArray[index];
            console.log(day)
            const date = moment.unix(day.dt).format('L'); 
            console.log(date)
            

            var fiveDayIcon = day.weather[0].icon;
            var fiveDayIconURL = "http://openweathermap.org/img/wn/" + fiveDayIcon + "@2x.png";
            

            var temp =  day.main.temp;
            var wind = day.wind.speed;
            var fiveDayDescription = day.weather[0].main
            $('#future-weather').append(`
            <div class="col">
            <div class="card w-60 p-1" id="card-body">
                <h4 class="card-text" id="fiveday1">Date: ${date}</h4>
                <p><img src="${fiveDayIconURL}" /></p>
                <p class="card-text" id="fivedaytemp1">Temp: ${temp}</p>
                <p class="card-text" id="fivedaywind1">Wind: ${wind}</p>
                <p class="card-text" id="fivedayhumid1">${fiveDayDescription} </p>
            </div>
        </div>
            `)
      
            
        };
      })
      .catch(function (error) {
          console.error(error)
      });
};

// clears the search history

// passwordBtnEl.on('click', function () {
//     var newPassword = passwordGenerator(15);
//     passwordDisplayEl.text(newPassword);
//   });

// Displays the search history

function displayHistory() {
    historyButton = $(`<li><button id='history-btn' data-city='${searchCity}' class='btn btn-outline-secondary' type='button'>${searchCity}</button>`);
    searchHistory.append(historyCityBtn);

    var historyBtn = $(this).data('searchCity');


    currentForecast(historyBtn);
}

// Search function 

search.on('submit', function (event){
    event.preventDefault();
    console.log(searchCity.val());
    var nameCity = searchCity.val()
    currentForecast(nameCity);
 });

//  var string = "i am string"

//  var number = 10

//  var object = {
//      name: "Sam",
//      job: "Tutor",
//      skill: 10

//  }

// var array = ["hello0", "hello1", string, number, object ]
// console.log(array[4].name)
// console.log(object.name)