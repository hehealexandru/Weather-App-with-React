import React from 'react';
import { getDayAndLocalTimeFromTimestamp } from './utilities/DatetimeUtils';
import MapComponent from './MapComponent'; // Importă componenta de Hartă

// Funcție ajutătoare pentru a importa dinamic iconițele meteo
const getWeatherIconUrl = (iconCode) => {
    try {
        // Folosește require pentru a importa dinamic imaginea din directorul 'assets/icons/'
        return require(`./assets/icons/${iconCode}.png`);
    } catch (e) {
        // Fallback pentru iconițele lipsă
        return require('./assets/icons/unknown.png'); 
    }
};

// Componenta primește acum lat și lon
const HourlyForecast = ({ city, forecastData, loading, error, lat, lon }) => {
    // ---------------------------------------------
    // EN: Component logic for the 3-Hour Forecast page
    // ---------------------------------------------
    
    // Valori implicite în caz că lipsesc
    const defaultLat = 44.43; // Bucharest default
    const defaultLon = 26.10; // Bucharest default

    if (loading) {
        return <p className="loading">Loading hourly forecast...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    const forecastList = forecastData?.list;

    // Afișează harta indiferent dacă există prognoza orară, dar asigură-te că există date de bază
    const mapSection = (
        <MapComponent 
            // Folosește lat/lon primite sau valorile implicite
            lat={lat || defaultLat} 
            lon={lon || defaultLon} 
            city={city} 
        />
    );


    if (!forecastList || forecastList.length === 0) {
        return (
            <div className="hourly-forecast-page">
                
                <p className="error">No hourly forecast data available.</p>
            </div>
        );
    }

    // Afișează toate cele 40 de prognoze din 3 în 3 ore pe 5 zile
    return (
        <div className="hourly-forecast-page">
            {/* PLASEAZĂ HARTA DEASUPRA PROGNOZEI */}
        

            <h2 className="hourly-forecast-title">3-Hour Weather Forecast for {city}</h2>
            
            <div className="hourly-forecast-list">
                {/* Iterează peste lista de intervale de 3 ore */}
                {forecastList.map((item, index) => (
                    <div key={index} className="hourly-forecast-item">
                        {/* Ora în fusul orar local al utilizatorului (Day HH:MM) */}
                        <div className="forecast-time">
                            {getDayAndLocalTimeFromTimestamp(item.dt)}
                        </div>
                        
                        {/* Iconița meteo */}
                        <img 
                            // Iconițele se bazează pe codul OpenWeatherMap (e.g., 01d, 10n)
                            src={getWeatherIconUrl(item.weather[0].icon)}
                            alt={item.weather[0].description} 
                            className="forecast-icon" 
                        />
                        
                        {/* Detalii temperatură și descriere */}
                        <div className="forecast-details">
                            <p className="forecast-temp">
                                {Math.round(item.main.temp)}°C
                            </p>
                            <p className="forecast-description">
                                {/* Capitalizează prima literă a fiecărui cuvânt */}
                                {item.weather[0].description.split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')}
                            </p>
                        </div>
                        <div className="forecast-other">
                            <p>Feels like: {Math.round(item.main.feels_like)}°C</p>
                            <p>Humidity: {item.main.humidity}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;