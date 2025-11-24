// src/ChartPage.js

import React, { useState, useEffect } from 'react';
import Search from './Search';
import TemperatureChart from './TemperatureChart';
import { fetchHistoricalWeather } from './OpenWeatherService'; // Presupunem că ai adăugat această funcție
import './App.css'; // Pentru a prelua stilurile globale (card-uri, culori)

const ChartPage = ({ city: initialCity, handleSearch, apiKey }) => {
  const [currentCity, setCurrentCity] = useState(initialCity);
  const [period, setPeriod] = useState('weekly'); // 'weekly' sau 'monthly'
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Funcție pentru preluarea datelor istorice
  const loadChartData = async (cityName, timePeriod) => {
    if (!cityName) return;
    setLoading(true);
    setError("");
    setChartData(null);
    try {
        // AICI vei folosi noua funcție API pentru date istorice
        
        // **Simulare de date**
        const simulatedData = generateSimulatedData(timePeriod);
        setChartData(simulatedData); 

    } catch (err) {
      console.error("Historical data fetch error:", err);
      setError(`Unable to load historical data for ${cityName}. (Check API plan for historical access)`);
    } finally {
      setLoading(false);
    }
  };

  // Se execută la schimbarea orașului sau a perioadei
  useEffect(() => {
    setCurrentCity(initialCity);
    loadChartData(initialCity, period);
  }, [initialCity, period, apiKey]);


  // Funcție care gestionează căutarea Noului Oraș (folosește funcția din App.js)
  const handleCitySearch = (selected) => {
      // Aceasta actualizează starea globală (weatherData, forecastData) în App.js
      handleSearch(selected); 
  };
  
  // 🚀 MODIFICARE STIL AICI: Contrast puternic pentru butonul activ
  const buttonStyle = (isActive) => ({
    padding: '10px 15px',
    margin: '0 10px', // Măresc distanța
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
    
    // Stilul Butonului Inactiv
    backgroundColor: 'var(--hover-color)', // Fundal neutru (gri deschis/închis)
    color: 'var(--text-color)',
     fontWeight: 'bold',            // Text normal (Negru/Alb în funcție de temă)
    
    // Stilul Butonului Activ (Contrast Puternic)
    ...(isActive && { 
        backgroundColor: 'var(--primary-color)', // Culoarea ta principală
        color: 'orange',                          // Text Alb
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
    })
  });

  return (
    <>
        <div className="header">
            <h1 className="title">Grafic Temperaturi Istorice</h1>
            {/* Folosim componenta Search, dar funcția de tratare a căutării este cea din App.js */}
            <Search onSearchChange={handleCitySearch} placeholder={`Caută alt oraș pentru grafic...`} />
        </div>

        <div className="card-container">
            <div className="weather-card">
                <h2>Afișează date pentru: **{currentCity}**</h2>
                <div style={{ padding: '10px 0' }}> {/* Adaug spațiu în jurul butoanelor */}
                    <button 
                        style={buttonStyle(period === 'weekly')} 
                        onClick={() => setPeriod('weekly')}
                    >
                        Ultima Săptămână
                    </button>
                    <button 
                        style={buttonStyle(period === 'monthly')} 
                        onClick={() => setPeriod('monthly')}
                    >
                        Ultima Lună
                    </button>
                </div>
            </div>

            <div className="weather-card" style={{ minHeight: '400px', padding: '20px' }}>
                {loading && <p className="loading">Se încarcă datele graficului...</p>}
                {error && <p className="error">{error}</p>}
                
                {!loading && chartData && (
                    <TemperatureChart 
                        city={currentCity} 
                        period={period === 'weekly' ? 'Ultima Săptămână' : 'Ultima Lună'} 
                        data={chartData}
                    />
                )}
            </div>
        </div>
    </>
  );
};

export default ChartPage;


// Funcție ajutătoare pentru a simula datele în absența unui API istoric
const generateSimulatedData = (period) => {
    const days = period === 'weekly' ? 7 : 30;
    const data = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        
        const temp = Math.floor(Math.random() * (20 - 5) + 5); // Simulează temperaturi între 5 și 20
        const feels_like = temp - Math.floor(Math.random() * 3);
        
        data.unshift({ // Adaugă la început pentru a menține ordinea cronologică
            name: `${date.getDate()}/${date.getMonth() + 1}`,
            temp: temp,
            feels_like: feels_like,
        });
    }
    return data;
};
