var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var searchHistoryEl = document.querySelector("#search-history");
var cityBtn = document.querySelector(".cityBtn");
var clearBtn = document.querySelector("#clear-btn")

var cities = JSON.parse(localStorage.getItem('cities')) || [];

// function to be executed upon form submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    weatherReset();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getForecast(cityName);
        getCurrentWeather(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.");
    }
};
// get 5-day forecast
var getForecast = function(cityName) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=0ced535bc528eb83a827cdf37c9b703f&units=imperial";
    

    fetch(forecastUrl).then(function(response) {
        if(response.ok) {
        cities.push(cityName);
        localStorage.setItem("cities", JSON.stringify(cities)); 
        renderHistory();
        response.json().then(function(data) {
        

            for (var i = 0; i < data.list.length; i++) {
 
                if(data.list[i].dt_txt.split(" ")[1] == "15:00:00") {

                    var forecastDate = data.list[i].dt_txt;
                    
                    var forecastTemp = data.list[i].main.temp;

                    var forecastHumidity = data.list[i].main.humidity;

                    var iconcode = data.list[i].weather[0].icon;

                    var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

                    var cardTitle = 
                        "<div><h4>" +
                        "5-Day Forecast:" +
                        "</h4></div>"

                    var cardContent =
                            "<div class='col-2 m-2 cardDay'><p class='dateForecast'>" +
                            moment(forecastDate).format("MM/DD/YYYY") +
                            "</p><p>" +
                            '<img src="' + iconurl + '" />' +
                            "</p><p>" +
                            "Temp: " +
                            forecastTemp +
                            '℉' +
                            "</p><p>" +
                            'Humidity: ' +
                            forecastHumidity +
                            '%' +
                            "</p></div>";

                    
                    $(".forecastCards").append(cardContent);
                } 
            };
            $(".forecastTitle").append(cardTitle);
        });
        } else {
        alert("Error: " + response.statusText + " Please enter a city name");
    }
    });
};

// get current weather
var getCurrentWeather = function(cityName) {
    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0ced535bc528eb83a827cdf37c9b703f&units=imperial";
    
    fetch(currentUrl).then(function(response) {
        response.json().then(function(data) {
            
            var currentDate = moment().format("MM/DD/YYYY");
             
            var currentTemp = data.main.temp;
            
            var currentHumidity = data.main.humidity;
            
            var currentWind = data.wind.speed;

            var latitude = data.coord.lat;

            var longitude = data.coord.lon;

            var iconcode = data.weather[0].icon;

            var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=0ced535bc528eb83a827cdf37c9b703f&lat=" + latitude + "&lon=" + longitude;
                fetch(uvUrl).then(function(response) {
                    response.json().then(function(uvData) {
                
                var uvIndex = uvData.value;
                
            

                    var currentContent =
                            "<div class='col-12 p-1 m-3'><h3>" +
                            "Current Weather in " + cityName.toUpperCase() + ": " +
                            currentDate + "<h3>" +
                            "</p><p>" +
                            '<img src="' + iconurl + '" />' +
                            "</p><p>" +
                            "Temp: " +
                            currentTemp +
                            '℉' +
                            "</p><p>" +
                            'Humidity: ' +
                            currentHumidity +
                            '%' +
                            "</p><p>" +
                            'Wind Speed: ' +
                            currentWind +
                            'mph' +
                            "</p><p>UV Index: " +
                            "<span>" + uvIndex + "</span>" +
                            "</p></div>";

                    $(".currentWeather").append(currentContent);
                    })
                })
        });
    });
};

var weatherReset = function() {
    $(".forecastCards").empty();
    $(".currentWeather").empty();
    $(".forecastTitle").empty();
    
};

var renderHistory = function () {
    $(".search-history").html("");
    for (var i = 0; i < cities.length; i++) {
        var searchContent =
            "<button id='cityBtn' class='col-10 p-3 m-3'><h3 id='cityName'>" +
            cities[i] +
            "</button>";
        $(".search-history").prepend(searchContent);
    }
};

$(document).on('click','#cityBtn',function(){
    var cityName= this.textContent;
    weatherReset();
    getCurrentWeather(cityName);
    getForecast(cityName);
  
});

var clearHistory = function() {
    $(".search-history").html("");
    cities = [];
    localStorage.clear();

}

renderHistory();
clearBtn.addEventListener("click", clearHistory);
userFormEl.addEventListener("submit", formSubmitHandler);
 