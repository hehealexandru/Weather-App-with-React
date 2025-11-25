import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TodayWeather({ data }) {
  const main = data.main || {};
  const weather = data.weather?.[0] || {};
  const wind = data.wind || {};

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{data.city}</Text>

      <Text style={styles.temp}>{Math.round(main.temp)}°C</Text>
      <Text style={styles.desc}>{weather.description}</Text>

      <View style={styles.detailsGrid}>
        <Text style={styles.detail}>Feels like: {Math.round(main.feels_like)}°C</Text>
        <Text style={styles.detail}>Humidity: {main.humidity}%</Text>
        <Text style={styles.detail}>Pressure: {main.pressure} hPa</Text>
        <Text style={styles.detail}>Wind: {wind.speed} m/s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9fbff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    paddingVertical: 22,
    paddingHorizontal: 18,
    marginTop: 25,

    // shadow for iOS
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4, // Android shadow fallback
    borderWidth: 1,
    borderColor: "rgba(0,80,160,0.25)",
  },

  city: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#1b4f9c",
    marginBottom: 10,
  },

  temp: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "700",
    color: "#1b4f9c",
    marginBottom: 4,
  },

  desc: {
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 16,
    fontWeight: "500",
    color: "#1b4f9c",
    marginBottom: 18,
  },

  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  detail: {
    width: "48%",
    fontSize: 15,
    color: "#0b1e40",
    marginBottom: 10,
  },
});
