// set date and time on load

let now = new Date();

let date = now.getDate();
let hours = now.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
    }
let minutes = now.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
    }
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${month} ${date}, ${year}`;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} / ${hours}:${minutes}`;

// set on load city and temp for London

let apiKey = "f3711ec096b8e2b5d745c777afc03d71";
let units = "metric";
let city = "London"
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

function showTemp(response) {

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  let locationElement = document.querySelector("#current-location");
  let conditionElement = document.querySelector("#conditions");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;
  
  temperatureElement.innerHTML = `${temperature}`;
  locationElement.innerHTML = `${city}`;
  conditionElement.innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

let loadtemp = document.querySelector("#current-temp");
loadtemp.innerHTML = `${showTemp}`;  // replace with current temperature in London England

axios.get(`${apiUrl}`).then(showTemp);

apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayForecast);
// display 3 hour forecast on load by calling function below displayforecast
// display input search data 

function displayTemp(response) {
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#conditions").innerHTML = response.data.weather[0].description;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];

  forecastElement.innerHTML = `
  <div class="col-2">
    <h3>${hours}:${minutes}</h3>
    <img 
      src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
    />
    <div class="forecast-temp">
      <strong>${Math.round(forecast.main.temp_max)}˚</strong> ${Math.round(forecast.main.temp_min)}˚
    </div>
  </div>`;
  
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let units = "metric";
  let apiKey = "f3711ec096b8e2b5d745c777afc03d71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(displayTemp);

  apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  // remove the active class on the celsius link
  // celsiusLink.classList.remove("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
