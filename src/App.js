import { fetchWeatherData, fetchWeatherByCity } from "./OpenWeatherService";
import React, { useState, useEffect } from "react";
import "./App.css";
import Search from "./Search";
import TodayWeather from "./TodayWeather";
import WeeklyForecast from "./WeeklyForecast";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Bucharest");

  // Tema aplicației (light / dark)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Actualizează tema globală la schimbare
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Schimbă tema
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Cheia API
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // Afișează implicit București la prima încărcare
  useEffect(() => {
    handleSearch({ label: city, value: "44.43 26.10" });
  }, []);

  // Funcția principală de căutare
  const handleSearch = async (selected) => {
    try {
      setLoading(true);
      setError("");

      // Dacă utilizatorul introduce manual un oraș (ex: London)
      if (typeof selected === "string") {
        const [cityWeather, cityForecast] = await fetchWeatherByCity(
          selected,
          apiKey
        );
        setWeatherData({ city: cityWeather.name, ...cityWeather });
        setForecastData({ city: cityWeather.name, list: cityForecast.list });
        return;
      }

      // Altfel, căutare după coordonate (din selector)
      const [lat, lon] = selected.value.split(" ");
      const [today, forecast] = await fetchWeatherData(lat, lon, apiKey);
      setWeatherData({ city: selected.label, ...today });
      setForecastData({ city: selected.label, list: forecast.list });
    } catch (err) {
      setError("Unable to load weather data.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="app">
    {/* switch global */}
    <div className="theme-switch" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </div>

    <header className="header">
      <h1 className="title">WeatherApp with React</h1>
      <Search onSearchChange={handleSearch} />
    </header>

    {loading && <p className="loading">Loading weather data...</p>}
    {error && <p className="error">{error}</p>}

    {!loading && weatherData && (
      <>
        <TodayWeather data={weatherData} />
        <WeeklyForecast data={forecastData} />
      </>
    )}

    <footer className="footer">
      <p>Data provided by OpenWeatherMap</p>
    </footer>
  </div>
);
}
