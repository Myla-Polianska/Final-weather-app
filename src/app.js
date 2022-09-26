function formatDate (timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours= `0${hours}`;
} 
let minutes = date.getUTCMinutes();
if (minutes < 10) {
    minutes= `0${minutes}`;
} 
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
let day =days[date.getDay()] ;
   
return `${day} ${hours}:${minutes}`;
}


function displayTemperature (response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let speedElement = document.querySelector("#speed");
    let dateElement = document.querySelector("#date");
 
    temperatureElement.innerHTML= Math.round (response.data.main.temp);
    cityElement.innerHTML= response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    speedElement.innerHTML=response.data.wind.speed;
    dateElement.innerHTML= formatDate(response.data.dt * 1000);

}

let apiKey = "2da268162fce29233010fa7646fed33b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kharkiv&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);