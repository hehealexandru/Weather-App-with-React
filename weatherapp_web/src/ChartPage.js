// src/ChartPage.js (COD NOU COMPLET)

import React, { useState, useEffect } from 'react';
import Search from './Search';
import TemperatureChart from './TemperatureChart';
// Importăm noua funcție din serviciul OpenWeather:
import { formatForecastDataForChart } from './OpenWeatherService'; 
import './App.css'; 


// Am adăugat 'forecastData' la props
const ChartPage = ({ city: initialCity, handleSearch, forecastData }) => {
    const [currentCity, setCurrentCity] = useState(initialCity);
    const [period, setPeriod] = useState('weekly'); // 'weekly' sau 'monthly'
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // Funcție care procesează datele de prognoză primite
    const processChartData = (data, timePeriod) => {
        setLoading(true);
        setError("");

        if (!data || !data.list || data.list.length === 0) {
            setError(`Temperature data is not available for ${initialCity}.`);
            setChartData(null);
            setLoading(false);
            return;
        }

        try {
            // APELUL CĂTRE FUNCȚIA CARE PREIA DATELE REALE ZILNICE
            const realData = formatForecastDataForChart(data.list);

            if (timePeriod === 'weekly') {
                // Luăm prognoza pentru primele 7 zile disponibile
                setChartData(realData.slice(0, 7)); 
            } else if (timePeriod === 'monthly') {
                // Afișăm toată prognoza disponibilă (de obicei ~5 zile, pentru a simula luna)
                setChartData(realData); 
            }
        } catch (err) {
            setError("Eroare la procesarea datelor graficului.");
            setChartData(null);
        } finally {
            setLoading(false);
        }
    };


    // Efectul se declanșează când se schimbă orașul, perioada SAU datele de prognoză
    useEffect(() => {
        setCurrentCity(initialCity);
        // Apelăm funcția de procesare cu datele reale
        processChartData(forecastData, period); 
    }, [initialCity, period, forecastData]);


    // Funcție care gestionează căutarea Noului Oraș (folosește funcția din App.js)
    const handleCitySearch = (selected) => {
        handleSearch(selected); 
    };
    
    // Stilurile butoanelor (rămân cele cu contrast optim)
    const buttonStyle = (isActive) => ({
        padding: '10px 15px',
        margin: '0 10px', 
        border: '1px solid #007bff', 
        borderRadius: '8px',
        cursor: 'pointer',
        transition: '0.3s',
        
        backgroundColor: 'transparent', 
        color: '#007bff', 
        fontWeight: 'normal',
        
        ...(isActive && { 
            backgroundColor: '#007bff', 
            color: 'white',              
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
        })
    });


    return (
        <>
            <div className="header">
                <h1 className="title">Historical Temperature Chart</h1>
                <Search onSearchChange={handleCitySearch} placeholder={`Search another city for chart...`} />
            </div>

            <div className="card-container">
                <div className="weather-card">
                    <h2>Displaying data for: <strong>{currentCity}</strong></h2>
                    <div style={{ padding: '10px 0' }}>
                        <button 
                            style={buttonStyle(period === 'weekly')} 
                            onClick={() => setPeriod('weekly')}
                        >
                            Next week
                        </button>
                        <button 
                            style={buttonStyle(period === 'monthly')} 
                            onClick={() => setPeriod('monthly')}
                        >
                            Next month
                        </button>
                    </div>
                </div>

                <div className="weather-card" style={{ minHeight: '400px', padding: '20px' }}>
                    {loading && <p className="loading">Loading chart data...</p>}
                    {error && <p className="error">{error}</p>}
                    
                    {!loading && chartData && (
                        <TemperatureChart 
                            city={currentCity} 
                            period={period === 'weekly' ? 'Next week' : 'Next month'} 
                            data={chartData}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default ChartPage;
