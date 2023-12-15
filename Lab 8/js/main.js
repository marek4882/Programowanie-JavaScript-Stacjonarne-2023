document.getElementById("addCity").addEventListener("click", addWeather);
const cityInput = document.getElementById("cityInput");
const apiKey = "6f86a2a775bed699ef7fcfccafa99196";

let cities = JSON.parse(localStorage.getItem("cities")) || [];

const fetchWeather = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  return data;
};

const createWeather = (data) => {
  const weatherCard = document.createElement("article");
  const urlIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  weatherCard.innerHTML = `
      <img src="${urlIcon}" alt="Icon of weather" />
      <h2>${data.name}</h2>
      <p>Temperature: ${data.main.temp}</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
};

async function updateWeather() {
  for (const city of cities) {
    const weatherData = await fetchWeather(city);
    createWeather(weatherData);
  }
}

function addWeather() {
  const city = cityInput.value;
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
  cityInput.value = "";
  updateWeather();
}

updateWeather();

setInterval(updateWeather, 300000);
