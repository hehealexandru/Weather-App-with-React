import React from "react";

export default function WeeklyForecast({ data }) {
  if (!data || !data.list) {
    return <p className="no-data">No forecast data available.</p>;
  }

  const limited = data.list.slice(0, 5);

  return (
    <section className="weekly-forecast">
      <h3>Weekly Forecast</h3>
      <div className="forecast-grid">
        {limited.map((day, index) => (
          <div key={index} className="forecast-card">
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
            <p className="forecast-desc">{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
