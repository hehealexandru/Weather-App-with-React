import React, { useState } from "react";
import { fetchCities } from "./OpenWeatherService";

export default function Search({ onSearchChange }) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value.trim();
    setInput(value);

    // Dacă nu s-a scris nimic sau e prea scurt
    if (value.length < 2) {
      setResults([]);
      return;
    }

    // Caută orașe din API
    try {
      const citiesList = await fetchCities(value);
      if (citiesList && citiesList.data) {
        setResults(citiesList.data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("City search failed:", err);
      setResults([]);
    }
  };

  const handleSelect = (city) => {
    const data = {
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    };

    onSearchChange(data);
    setInput(`${city.name}, ${city.countryCode}`);
    setResults([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for cities..."
        value={input}
        onChange={handleInputChange}
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((city) => (
            <li key={city.id} onClick={() => handleSelect(city)}>
              {city.name}, {city.countryCode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
