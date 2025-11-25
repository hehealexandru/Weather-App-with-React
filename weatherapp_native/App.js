import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";

import { fetchWeatherData, fetchWeatherByCity } from "./OpenWeatherService";
import Search from "./Search";
import TodayWeather from "./TodayWeather";
import WeeklyForecast from "./WeeklyForecast";


const lightTheme = {
  bgColor: "#e6f0ff",
  textColor: "#003366",
  cardBg: "#f9fbff",
  accent: "#0066cc",
};

const darkTheme = {
  bgColor: "#0b1628",
  textColor: "#e2e6ef",
  cardBg: "#162238",
  accent: "#2a9df4",
};

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Bucharest");

  const [theme, setTheme] = useState("light");
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY || "c215b2491bf06a32cdc17485901273ff";

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    handleSearch({ label: city, value: "44.43 26.10" });
  }, []);

  const handleSearch = async (selected) => {
    try {
      setLoading(true);
      setError("");

      if (typeof selected === "string") {
        const [cityWeather, cityForecast] = await fetchWeatherByCity(
          selected,
          apiKey
        );

        setWeatherData({ city: cityWeather.name, ...cityWeather });
        setForecastData({ city: cityWeather.name, list: cityForecast.list });
        setCity(cityWeather.name);
        return;
      }

      const [lat, lon] = selected.value.split(" ");
      const [today, forecast] = await fetchWeatherData(lat, lon, apiKey);

      setWeatherData({ city: selected.label, ...today });
      setForecastData({ city: selected.label, list: forecast.list });
      setCity(selected.label);
    } catch (err) {
      console.log("Weather fetch failed:", err);
      setError("Unable to load weather data.");
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: currentTheme.bgColor },
      ]}
    >
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
      <View style={styles.appContainer}>
        <View style={styles.themeSwitchWrapper}>
          <Pressable
            onPress={toggleTheme}
            style={[
              styles.themeSwitch,
              { backgroundColor: currentTheme.cardBg },
            ]}
          >
            <Text
              style={[
                styles.themeSwitchText,
                { color: currentTheme.textColor },
              ]}
            >
              {theme === "light" ? "Dark mode" : "Light mode"}
            </Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { backgroundColor: currentTheme.bgColor },
          ]}
        >
          <View
            style={[
              styles.header,
              {
                backgroundColor: currentTheme.cardBg,
                borderColor: "rgba(0,80,160,0.25)",
              },
            ]}
          >
            <Text
              style={[
                styles.title,
                { color: currentTheme.accent },
              ]}
            >
              WeatherApp with React Native
            </Text>
            <Search onSearchChange={handleSearch} />
          </View>
          {loading && (
            <Text style={styles.loading}>Loading weather data...</Text>
          )}

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {!loading && weatherData && (
            <>
              <TodayWeather data={weatherData} />
              <WeeklyForecast data={forecastData} />
            </>
          )}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Data provided by OpenWeatherMap
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },

  themeSwitchWrapper: {
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  themeSwitch: {
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(0,80,160,0.3)",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  themeSwitchText: {
    fontWeight: "500",
    fontSize: 14,
  },

  header: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },

  loading: {
    marginTop: 12,
    fontSize: 16,
    color: "#003366",
  },
  error: {
    marginTop: 12,
    fontSize: 16,
    color: "#cc0033",
    textAlign: "center",
  },

  footer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,80,160,0.2)",
    paddingTop: 10,
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#666",
    opacity: 0.8,
  },
});
