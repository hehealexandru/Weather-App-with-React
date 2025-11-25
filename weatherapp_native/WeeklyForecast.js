import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function WeeklyForecast({ data }) {
  if (!data || !data.list) {
    return <Text style={styles.noData}>No forecast data available.</Text>;
  }

  const limited = data.list.slice(0, 5);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weekly Forecast</Text>

      <View style={styles.grid}>
        {limited.map((day, index) => (
          <View key={index} style={styles.itemCard}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
              }}
              style={styles.icon}
            />

            <Text style={styles.temp}>
              {Math.round(day.main.temp)}°C
            </Text>

            <Text style={styles.desc}>
              {day.weather[0].description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noData: {
    textAlign: "center",
    color: "#1b4f9c",
    marginTop: 20,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#f9fbff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    paddingVertical: 22,
    paddingHorizontal: 18,
    marginTop: 25,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0,80,160,0.25)",
  },

  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#1b4f9c",
    marginBottom: 16,
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  itemCard: {
    backgroundColor: "#a8a8a8",   // <- modificarea cerută
    width: "30%",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  icon: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },

  temp: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1b4f9c",
    marginBottom: 3,
  },

  desc: {
    fontSize: 13,
    color: "#0b1e40",
    textTransform: "capitalize",
    textAlign: "center",
  },
});
