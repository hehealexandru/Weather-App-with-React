// src/utilities/DatetimeUtils.js
// ... (restul importurilor și funcțiilor existente)

// Adaugă această funcție la sfârșitul fișierului:
/**
 * Gets the short date and local time for the hourly forecast (e.g., "Mon 14:00").
 * Uses the user's local PC time.
 * @param {number} timestamp - Unix timestamp in seconds (from OpenWeather dt).
 * @returns {string} - Date and time string (e.g., "Mon 14:00").
 */
export function getDayAndLocalTimeFromTimestamp(timestamp) {
  // Multiply by 1000 because JavaScript Date object uses milliseconds
  const date = new Date(timestamp * 1000); 
  
  // 'en-US' ensures output is in English locale format
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  // toLocaleTimeString automatically uses the user's local timezone
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23', // Ensures 24-hour format
  });
  
  return `${day} ${time}`;
}