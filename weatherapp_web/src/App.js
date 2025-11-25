import { fetchWeatherData, fetchWeatherByCity } from "./OpenWeatherService";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"; 
import "./App.css";

import Search from "./Search";
import TodayWeather from "./TodayWeather";
import WeeklyForecast from "./WeeklyForecast";
import ChartPage from "./ChartPage";
import HourlyForecast from "./HourlyForecast";
import MapComponent from "./MapComponent";

// ----------------------------------------------------------------------
// 1. Home Page (Today's Weather + Weekly Forecast)
// ----------------------------------------------------------------------

const HomePage = ({ weatherData, forecastData, loading, error, handleSearch }) => {
  return (
    <>
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
    </>
  );
};

// ----------------------------------------------------------------------
// 2. Main App Component (Theme, Data Logic, Routing)
// ----------------------------------------------------------------------

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initialCity = "Bucharest";

  // Theme (light/dark)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // Coordinates for Map
  const latitude = weatherData?.coord?.lat;
  const longitude = weatherData?.coord?.lon;

  // Load Bucharest by default
  useEffect(() => {
    handleSearch({ label: initialCity, value: "44.43 26.10" });
  }, []);

  // Search function (city name or coordinates)
  const handleSearch = async (selected) => {
    try {
      setLoading(true);
      setError("");

      let cityLabel = initialCity;
      let today, forecast;

      if (typeof selected === "string") {
        const [cityWeather, cityForecast] = await fetchWeatherByCity(
          selected,
          apiKey
        );
        cityLabel = cityWeather.name;
        today = cityWeather;
        forecast = cityForecast;
      } else if (selected && selected.value) {
        cityLabel = selected.label;
        const [lat, lon] = selected.value.split(" ");
        [today, forecast] = await fetchWeatherData(lat, lon, apiKey);
      } else {
        throw new Error("Invalid search input.");
      }

      setWeatherData({ city: cityLabel, ...today });
      setForecastData({ city: cityLabel, list: forecast.list });

    } catch (err) {
      console.error(err);
      setError("Weather data could not be loaded or the city was not found.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="app">

        <AppNavigation 
          toggleTheme={toggleTheme} 
          theme={theme} 
          currentCity={weatherData?.city || initialCity} 
        />

        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage
                weatherData={weatherData}
                forecastData={forecastData}
                loading={loading}
                error={error}
                handleSearch={handleSearch}
              />
            } 
          />

          <Route 
            path="/chart" 
            element={
              <ChartPage
                city={weatherData?.city || initialCity}
                handleSearch={handleSearch}
                apiKey={apiKey}
                forecastData={forecastData}
              />
            } 
          />

          <Route 
  path="/hourly" 
  element={
    <>
      {weatherData && latitude && longitude && (
        <MapComponent lat={latitude} lon={longitude} />
      )}

      <HourlyForecast
        city={weatherData?.city || initialCity}
        forecastData={forecastData}
        loading={loading}
        error={error}
      />
    </>
  } 
/>

        </Routes>
      </div>
    </Router>
  );
}

// ----------------------------------------------------------------------
// 3. Navigation Component
// ----------------------------------------------------------------------

const AppNavigation = ({ toggleTheme, theme, currentCity }) => {
  const location = useLocation();

  const getLinkClass = (path) =>
    `nav-button ${location.pathname === path ? "active-nav" : ""}`;

  return (
    <div className="nav-bar">
      <Link to="/" className={getLinkClass("/")}>
        🏠 Today's Weather ({currentCity})
      </Link>

      <Link to="/chart" className={getLinkClass("/chart")}>
        📊 Temperature Chart
      </Link>

      <Link to="/hourly" className={getLinkClass("/hourly")}>
        🕐 Hourly Forecast
      </Link>

      <div className="theme-switch" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </div>
    </div>
  );
};
