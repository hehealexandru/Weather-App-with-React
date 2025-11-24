import { fetchWeatherData, fetchWeatherByCity } from "./OpenWeatherService";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"; // Adăugat: Router, Routes, Route, Link, useLocation
import "./App.css";
import Search from "./Search";
import TodayWeather from "./TodayWeather";
import WeeklyForecast from "./WeeklyForecast";
import ChartPage from "./ChartPage"; // Adăugat: Componenta pentru grafic

// ----------------------------------------------------------------------
// 1. Componenta Pagina Principală (Vremea de Azi + Prognoza Săptămânală)
// ----------------------------------------------------------------------

// Am mutat logica de afișare a vremii de azi și prognoza săptămânală într-o componentă separată
const HomePage = ({ weatherData, forecastData, loading, error, handleSearch, toggleTheme, theme }) => {
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
// 2. Componenta Principală App (Logica de Date, Tema și Rutarea)
// ----------------------------------------------------------------------

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Am păstrat 'city' doar pentru inițializare, dar datele sunt stocate în weatherData
  const initialCity = "Bucharest"; 

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
    // Coordonatele pentru București: 44.43 Nord, 26.10 Est
    handleSearch({ label: initialCity, value: "44.43 26.10" }); 
  }, []);

  // Funcția principală de căutare
  const handleSearch = async (selected) => {
    try {
      setLoading(true);
      setError("");

      let cityLabel = initialCity;
      let today, forecast;

      // Căutare după nume de oraș (string)
      if (typeof selected === "string") {
        const [cityWeather, cityForecast] = await fetchWeatherByCity(
          selected,
          apiKey
        );
        cityLabel = cityWeather.name;
        today = cityWeather;
        forecast = cityForecast;
      } 
      // Căutare după coordonate (obiect din selector)
      else if (selected && selected.value) {
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
      setError("Unable to load weather data or city not found.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
        <div className="app">
          {/* Navigarea și switch-ul de temă */}
          <AppNavigation toggleTheme={toggleTheme} theme={theme} currentCity={weatherData?.city || initialCity} />

          <Routes>
            <Route path="/" element={
              <HomePage 
                weatherData={weatherData} 
                forecastData={forecastData} 
                loading={loading} 
                error={error} 
                handleSearch={handleSearch} 
              />
            } />
            
            {/* Noua Rută pentru Grafic - folosim datele și funcția de căutare din App.js */}
            <Route path="/chart" element={
              <ChartPage 
                city={weatherData?.city || initialCity} // Transmite orașul curent
                handleSearch={handleSearch}             // Permite schimbarea orașului în pagina de grafic
                apiKey={apiKey}
              />
            } />
          </Routes>
        </div>
    </Router>
  );
}



const AppNavigation = ({ toggleTheme, theme, currentCity }) => {
    const location = useLocation();

    // Setează clasa CSS activă pentru a evidenția butonul de pe pagina curentă
    const getLinkClass = (path) => 
        `nav-button ${location.pathname === path ? 'active-nav' : ''}`;

    return (
        <div className="nav-bar">
            {/* Butoanele de Navigare */}
            <Link to="/" className={getLinkClass('/')}>
                🏠 Today's Weather({currentCity})
            </Link>
            <Link to="/chart" className={getLinkClass('/chart')}>
                📊 Temperature Chart
            </Link>

            {/* Butonul de Dark Mode */}
            <div className="theme-switch" onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </div>
        </div>
    );
};
