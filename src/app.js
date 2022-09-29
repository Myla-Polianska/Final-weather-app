function formatDate (timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours= `0${hours}`
} 
let minutes = date.getUTCMinutes();
if (minutes < 10) {
    minutes= `0${minutes}`
} 


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
let day =days[date.getDay()] ;
   
return `${day} ${hours}:${minutes}`;
}

function displayForecast(response){
    let forecastPerDay = response.data.daily;
    let forecastElement= document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    
    forecastPerDay.forEach(function(forecastDay){
        forecastHTML = forecastHTML + `
    
                    <div class="col-2" width="100">
                        <div class="weather-forecast-date">
                            ${forecastDay.dt}
                        </div>
                        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42">
                        <div class="weather-forecast-temperature">
                            <span class="weather-forecast-temperature-min">
                                ${forecastDay.temp.min}°
                            </span>
                            <span class="weather-forecast-temperature-max">
                               ${forecastDay.temp.max}°
                            </span>

                        </div>

                    </div> `;
    });
    
                
                forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML=forecastHTML;
    
}

 function getForecast(coordinates){
    let apiKey = "2da268162fce29233010fa7646fed33b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);

 }

function displayTemperature (response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#speed");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    

    celsiusTemperature= response.data.main.temp;
    temperatureElement.innerHTML= Math.round (celsiusTemperature);
    cityElement.innerHTML= response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    speedElement.innerHTML=response.data.wind.speed;
    dateElement.innerHTML= formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute ("alt", response.data.weather[0].description);
    
    getForecast(response.data.coord);

    }



function search (city){
let apiKey = "2da268162fce29233010fa7646fed33b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
    
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
     let temperatureElement = document.querySelector("#temperature");
     celsiusLink.classList.remove("active");
     fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) /5 + 32;
   
    temperatureElement.innerHTML= Math.round (fahrenheitTemperature);

}

function displayCelsiusTemperature (event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML= Math.round (celsiusTemperature);
}


let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


search("Kharkiv");
