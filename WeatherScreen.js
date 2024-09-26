// screens/WeatherScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key

const WeatherScreen = ({ route }) => {
  const { city } = route.params;
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      // Fetch current weather
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=%7B{city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setForecast(forecastResponse.data.list);
    } catch (error) {
      alert('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {weather && (
        <View>
          <Text style={styles.title}>{weather.name}</Text>
          <Text style={styles.temperature}>{weather.main.temp}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>
      )}
      <Text style={styles.forecastTitle}>5-Day Forecast</Text>
      <FlatList
        data={forecast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Text>{new Date(item.dt_txt).toLocaleDateString()}</Text>
            <Text>{item.main.temp}°C</Text>
            <Text>{item.weather[0].description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  temperature: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  forecastTitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default WeatherScreen;
