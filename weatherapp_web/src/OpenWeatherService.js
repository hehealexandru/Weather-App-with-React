const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '9c13c625e6345c62168147c7936399c1';

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4492f4d3c8msh1ba07ccc18e340ep1475c6jsnd854ff76bb2a',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

export async function fetchWeatherData(lat, lon, apiKey) 
{
  {
  try {
    console.log("Fetching weather for:", lat, lon);
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    console.log("Weather response status:", weatherResponse.status);
    console.log("Forecast response status:", forecastResponse.status);

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    console.log("Weather data:", weatherData);
    console.log("Forecast data:", forecastData);

    return [weatherData, forecastData];
  } catch (error) {
    console.error("FetchWeatherData error:", error);
  }
  }
}

export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function fetchWeatherByCity(cityName, apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY) {
  try {
    console.log("Fetching weather + forecast for city:", cityName);

    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`)
    ]);

    if (!weatherResponse.ok || !forecastResponse.ok) {
      throw new Error("City not found");
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    return [weatherData, forecastData];
  } catch (error) {
    console.error("fetchWeatherByCity error:", error);
    throw error;
  }
}

