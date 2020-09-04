var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");


// function to be executed upon form submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element & send it to getWeather
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        console.log(cityName);
        getWeather(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.");
    }
};

var getWeather = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=0ced535bc528eb83a827cdf37c9b703f";

    fetch(apiUrl)
      .then(function(response) {
          if(response.ok) {
             console.log("city data ok");
            }
        });
    };

   
    userFormEl.addEventListener("submit", formSubmitHandler);