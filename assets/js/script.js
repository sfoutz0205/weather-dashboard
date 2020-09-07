var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var cities = [];



// function to be executed upon form submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    $(".forecastCards").empty();
    $(".currentWeather").empty();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        cities.push
        getForecast(cityName);
        getCurrentWeather(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.");
    }
};

var getForecast = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=0ced535bc528eb83a827cdf37c9b703f&units=imperial";
    

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        

            for (var i = 0; i < data.list.length; i++) {
 
                if(data.list[i].dt_txt.split(" ")[1] == "15:00:00") {

                    var forecastDate = data.list[i].dt_txt;
                    // var convertedDate = moment(forecastDate).format("MM/DD/YYYY")
                    // console.log(moment(forecastDate).format("MM/DD/YYYY"));
                    
                    var forecastTemp = data.list[i].main.temp;

                    var forecastHumidity = data.list[i].main.humidity;

                    var iconcode = data.list[i].weather[0].icon;

                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

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
    });
};

var getCurrentWeather = function(cityName) {
    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0ced535bc528eb83a827cdf37c9b703f&units=imperial";
    

    fetch(currentUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data)
            
            var currentDate = moment().format("MM/DD/YYYY");
            
                    
            var currentTemp = data.main.temp;
            

            var currentHumidity = data.main.humidity;
            

            var currentWind = data.wind.speed;

            var iconcode = data.weather[0].icon;

            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

                    var currentContent =
                            "<div class='col-12 p-3 m-3'><h3>" +
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
                            "</p></div>";

                    $(".currentWeather").append(currentContent);
        })
    })
};


  
userFormEl.addEventListener("submit", formSubmitHandler);
 