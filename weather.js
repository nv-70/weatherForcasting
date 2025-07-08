// Wait for the DOM to be fully loaded before running any JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Getting references to all required DOM elements
  const cityInput = document.getElementById("city-input"); // Input field for city name
  const getWeatherBtn = document.getElementById("get-weather-btn"); // Button to fetch weather
  const weatherInfo = document.getElementById("weather-info"); // Div where weather data will be shown
  const cityNameDisplay = document.getElementById("city-name"); // Display city name
  const temperatureDisplay = document.getElementById("temperature"); // Display temperature
  const descriptionDisplay = document.getElementById("description"); // Display weather description
  const errorMessage = document.getElementById("error-message"); // Error message (fix typo if needed)

  // API key (should be stored in environment variables in production)
  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e";

  // Add click event listener to button
  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim(); // Trim input to remove extra spaces

    if (!city) return; // If input is empty, don't do anything

    // Try-catch block to handle async error from API call
    try {
      const weatherData = await fetchWeatherData(city); // Fetch weather data for given city
      displayWeatherData(weatherData); // If success, display the data
    } catch (error) {
      showError(); // If error (e.g., city not found), show error
    }
  });

  // Function to call the OpenWeatherMap API and get weather data
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url); // fetch returns a Promise with response object
    console.log(typeof response); // For debugging: logs "object"
    console.log("RESPONSE", response); // View full response object

    if (!response.ok) {
      // If response has non-200 status (like 404), throw an error
      throw new Error("City Not found");
    }

    const data = await response.json(); // Convert response to JSON format
    /*  Why do we need to convert the response into JSON format?
    When you use the fetch() API to make an HTTP request in JavaScript, it returns a Response object. This Response object
     contains the metadata of the response (like status code, headers, etc.) and also a body, but the body is not directly usable in most cases.
    By default, the body is a readable stream, not a usable JavaScript object. To extract the actual data (like weather details), you need 
    to parse it into a usable format — usually JSON.

    Q: Why do we use response.json() after calling fetch()? What would happen if we skip it?
A: The fetch() function returns a Response object whose body is a stream, not a directly usable JavaScript object.
 Using response.json() parses the 
 body into a JSON object so we can easily access its fields. Without this, we'd only have raw text or a stream, not a usable JavaScript structure. */

    return data; // Return weather data
  }

  // Function to display weather data on the screen 
  function displayWeatherData(data) {
    console.log(data); // Log the full data object for debugging

    // Destructure required fields from the data 
    const { name, main, weather } = data;

    // Update the DOM with weather info
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    // Show weather section, hide error
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  // Function to show error message
  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden"); // This should probably be `.remove("hidden")`
  }

  /*
  🔍 INTERVIEW QUESTIONS:
  -----------------------

  1. Q: What does `DOMContentLoaded` do?
     A: It ensures the JavaScript runs only after the full HTML is loaded, without waiting for stylesheets/images.

  2. Q: What are the benefits of using `async/await` over `.then()`?
     A: Cleaner syntax, easier to read and maintain, especially with try/catch for error handling.

  3. Q: Why use `trim()` on input?
     A: To avoid errors or unnecessary API calls due to accidental spaces.

  4. Q: What does `response.ok` check for?
     A: It checks whether the HTTP status code is in the 200–299 range (success responses).

  5. Q: What is the purpose of `fetch()` and how does it work?
     A: It's used to make network requests (GET/POST etc). It returns a Promise that resolves to a Response object.

  6. Q: What if the city name is incorrect or API fails?
     A: The catch block will be executed, and `showError()` will display the error message.

  7. Q: Why should API keys be stored in environment variables?
     A: To prevent exposing sensitive data in frontend code (for security reasons).

  8. Q: What's the role of `classList.remove()` and `classList.add()`?
     A: It toggles visibility by manipulating CSS classes (like `hidden`).

  9. Q: How would you improve error handling in this code?
     A: Show meaningful error messages (e.g., invalid city name, network error), retry logic, handle edge cases.

  🔧 BONUS:
  --------
  - Consider debouncing the API call if user is typing.
  - Add a loader or spinner during the fetch process.
  - Fix typo: `error-messag` → `error-message`.

  */
  /* ❓ Interview Questions:
1. What is destructuring in JavaScript?
Destructuring is a way to extract values from arrays or properties from objects into variables using a concise syntax.

2. How is object destructuring different from array destructuring?
Object destructuring uses key names.

Array destructuring uses position (index).

3. Can you rename variables while destructuring?
Yes, using : syntax:

js
Copy
Edit
const { name: fullName } = person;
4. What happens if the property doesn’t exist?
The variable becomes undefined, unless a default value is provided.

📦 Real-World Example with API:
Let's say you receive this JSON from an API:

json
Copy
Edit
{
  "main": { "temp": 32 },
  "weather": [ { "description": "cloudy" } ]
}
You can destructure it like this:

js
Copy
Edit
const data = {
  main: { temp: 32 },
  weather: [{ description: "cloudy" }]
};

const { main: { temp }, weather: [ { description } ] } = data;

console.log(temp);        // 32
console.log(description); // "cloudy"
 */
});
