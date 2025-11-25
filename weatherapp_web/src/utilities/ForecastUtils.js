export const filterHourlyForecast = (forecastList) => {
    if (!forecastList || forecastList.length === 0) {
        return [];
    }
    
    // Returnăm primele 8 puncte de date disponibile (care acoperă 24 de ore).
    const next24HoursData = forecastList.slice(0, 8);
    
    return next24HoursData;
};