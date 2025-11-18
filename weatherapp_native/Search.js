import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  Text, 
  Pressable, 
  FlatList, 
  StyleSheet 
} from "react-native";
import { fetchCities } from "./OpenWeatherService";

export default function Search({ onSearchChange }) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = async (value) => {
    const text = value.trim();
    setInput(text);

    if (text.length < 2) {
      setResults([]);
      return;
    }

    try {
      const citiesList = await fetchCities(text);
      if (citiesList && citiesList.data) {
        setResults(citiesList.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.log("City search failed:", error);
      setResults([]);
    }
  };

  const handleSelect = (city) => {
    const selected = {
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    };

    onSearchChange(selected);
    setInput(selected.label);
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for cities..."
        placeholderTextColor="#6a86a5"
        value={input}
        onChangeText={handleInputChange}
        style={styles.input}
      />

      {results.length > 0 && (
        <FlatList
          style={styles.resultsBox}
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.resultItem}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.resultText}>
                {item.name}, {item.countryCode}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#b3cce6",
    fontSize: 16,
    color: "#0b1e40",
    elevation: 3, // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 8,
  },
  resultsBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cfdff5",
    maxHeight: 220,
    marginTop: 2,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#e5efff",
  },
  resultText: {
    color: "#0b1e40",
    fontSize: 16,
  },
});
