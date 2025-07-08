document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input"); // Input field for city name
  const getWeatherBtn = document.getElementById("get-weather-btn"); // Button to fetch weather
  const weatherInfo = document.getElementById("weather-info"); // Div where weather data will be shown
  const cityNameDisplay = document.getElementById("city-name"); // Display city name
  const temperatureDisplay = document.getElementById("temperature"); // Display temperature
  const descriptionDisplay = document.getElementById("description"); // Display weather description
  const errorMessage = document.getElementById("error-message"); // Error message (fix typo if needed)

  const API_KEY = "b807b7fadef8a9a9db669e839fd2fe21";

  getWeatherBtn.addEventListener("click", async () => {
    let city = cityInput.value.trim();
    if (city == "") return;
    try {
      const weatherData = await fetchWeatherData(city); // Fetch weather data for given city
      DisplayWeatherData(weatherData); // If success, display the data
    } catch (error) {
      DisplayError(); // If error (e.g., city not found), show error
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log(response);
    if (!response.ok) {
      throw new Error("City Not found");
    }
    const data = await response.json();
    console.log();
    return data;
  }
  function DisplayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function DisplayError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
