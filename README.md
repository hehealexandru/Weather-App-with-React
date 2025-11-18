# 🌦️ WeatherApp with React

A clean, responsive weather application built with **React.js**, using the **OpenWeatherMap API** and **GeoDB Cities API**.  
The app provides real-time weather conditions, a 5-day forecast, and automatic light/dark theme switching.

---

## 🚀 Live Preview  
🔗 *(optional)* You can deploy your app on **Vercel** or **Netlify**, then place your live link here.  
Example: [https://weatherapp-react.vercel.app](https://weatherapp-react.vercel.app)

---

## 🖼️ Screenshots
### ☀️ Light Mode
![Light Mode Preview](./light_mode.png)

### 🌙 Dark Mode
![Dark Mode Preview](./dark_mode.png)

---

## ✨ Features
✅ Search for any city worldwide (powered by GeoDB API)  
✅ Real-time temperature, humidity, wind, and pressure  
✅ 5-day forecast with dynamic weather icons  
✅ Auto light/dark theme switcher  
✅ Fully responsive UI  
✅ Fast API fetching with caching and error handling  

---
## 🧭 GeoDB Cities API Used

Used for autocomplete city search.
Docs: https://rapidapi.com/wirefreethought/api/geodb-cities

---

## 🧩 Tech Stack
- **React.js (CRA)**  
- **CSS3 / Custom Theming (Light + Dark)**  
- **OpenWeatherMap API**  
- **GeoDB Cities API (RapidAPI)**  
- **GitHub for Version Control**

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/hehealexandru/Weather-App-with-React.git
cd Weather-App-with-React
=======
![Application screenshot](./public/screenshot.png)

<br/>
<br/>

With [The Weather Forecasting](https://the-weather-forecasting.netlify.app) user can search locations by city name and observe the weather for the next 5-6 days and 3 hour interval.
<br />
The app is developed using React.js and material-UI.

<br/>

## 💻 Live Demo:

https://the-weather-forecasting.netlify.app

<br/>

## ✨ Getting Started

- Make sure you already have `Node.js` and `npm` installed in your system.
- You need an API key from [OpenWeatherMap](https://openweathermap.org/). After creating an account, [grab your key](https://home.openweathermap.org/api_keys).
- Then, under the `src` directory, go to `api/OpenWeatherService` and replace `WEATHER_API_KEY` with your OpenWeatherMap API Key.
  - **`api/OpenWeatherService.js`**: It contains the code related to the back-end of the application.

<br/>

## ⚡ Install

- Clone the repository:

```bash
git clone https://github.com/Amin-Awinti/the-weather-forecasting.git

```

- Install the packages using the command `npm install`

<br/>

## 📙 Used libraries

- `react-js`
- `material-ui`

Check `packages.json` for details

<br/>

## 📄 Todos

- [ ] Styled-components
- [ ] Convert the entire project to TypeScript
- [ ] Unit Testing
- [ ] On launch, find user location weather by utilizing GeolocationAPI/GEOCODING
- [ ] Celcius/Fahrenheit conversion
- [ ] Dark/Light Mode

<br/>
Thank You ☺
>>>>>>> a3aa09e (v1.0.0)
