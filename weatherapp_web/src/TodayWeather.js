import React from "react";

export default function TodayWeather({ data }) {
  const main = data.main || {};
  const weather = data.weather?.[0] || {};
  const wind = data.wind || {};

  return (
    <section className="today-weather">
      <h2>{data.city}</h2>
      <p className="temp">{Math.round(main.temp)}°C</p>
      <p className="desc">{weather.description}</p>

      <div className="weather-details">
        <p>Feels like: {Math.round(main.feels_like)}°C</p>
        <p>Humidity: {main.humidity}%</p>
        <p>Pressure: {main.pressure} hPa</p>
        <p>Wind: {wind.speed} m/s</p>
      </div>
    </section>
  );
}
