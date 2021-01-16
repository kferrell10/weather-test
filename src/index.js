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
let units = "imperial";
let city = "London"
let pressure = response.data.main.pressure;

let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  let locationElement = document.querySelector("#current-location");
  temperatureElement.innerHTML = `${temperature}`;
  locationElement.innerHTML = `${city}`;
}

let loadtemp = document.querySelector("#current-temp");
loadtemp.innerHTML = `${showTemp}`;  // replace with current temperature in London England
let loadPressure = document.querySelector("#pressure");
pressureElement.innerHTML = `${pressure}`; // replace with current pressure in London England

axios.get(`${apiUrl}`).then(showTemp);

// display input search data 

function displayTemp(response) {
  document.querySelector("#current-location").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let units = "imperial";
  let apiKey = "f3711ec096b8e2b5d745c777afc03d71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(displayTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

