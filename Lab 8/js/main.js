document.getElementById("addCity").addEventListener("click", addWeather);
const cityInput = document.getElementById("cityInput");
const weatherContainer = document.getElementById("weatherContainer");
const apiKey = "6f86a2a775bed699ef7fcfccafa99196";

let cities = JSON.parse(localStorage.getItem("cities")) || [];

// Wyświetl pogodę dla wszystkich zapisanych miast

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
      <p>Temperature: ${Math.round(data.main.temp)}<sup>o</sup>C</p>
      <p>Humidity: ${data.main.humidity}%</p>
    `;
  // Dodaj przycisk do usuwania miasta z listy
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", () => {
    removeCity(data.name);
  });
  weatherCard.appendChild(deleteButton);
  return weatherCard;
};

const updateWeather = async () => {
  weatherContainer.innerHTML = "";
  for (const city of cities) {
    const weatherData = await fetchWeather(city);
    const weatherCard = createWeather(weatherData);
    weatherContainer.appendChild(weatherCard);
  }
};
updateWeather();

async function addWeather() {
  const city = cityInput.value.trim();
  if (city !== "") {
    if (!cities.includes(city)) {
      const newCityWeatherData = await fetchWeather(city);
      if (newCityWeatherData.cod === 200) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
        cityInput.value = "";
        const newCityWeatherCard = createWeather(newCityWeatherData);
        weatherContainer.appendChild(newCityWeatherCard);
      } else {
        console.log(`Nie znaleziono miasta ${city}!`);
      }
    } else {
      console.log(`${city} zostało już wyszukane!`);
    }
  }
}

function removeCity(city) {
  const index = cities.indexOf(city);
  if (index > -1) {
    cities.splice(index, 1);
  }
  localStorage.setItem("cities", JSON.stringify(cities));
  updateWeather();
}

setInterval(updateWeather, 300000);
