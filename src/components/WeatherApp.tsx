import  { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
//import { fetchWeather } from '../redux/weatherSlice';
import { fetchWeather } from '../redux/weatherSlice';
import { RootState } from '../redux/store';
import React = require('react');

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.weatherData);
  const loading = useSelector((state: RootState) => state.weather.loading);
  const error = useSelector((state: RootState) => state.weather.error);

  const handleSearch = () => {
    //dispatch(fetchWeather(city));
  };

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}/>
        
      <Button title="Get Weather" onPress={handleSearch} />
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && (
        <View>
          <Text>City: {weatherData.city.name}</Text>
          <Text>Temperature: {weatherData.list[0].main.temp}°C</Text>
          <Text>Forecast for next 5 days:</Text>
          {weatherData.list.slice(0, 5).map((forecast: any, index: number) => (
            <Text key={index}>
              {new Date(forecast.dt_txt).toLocaleDateString()}: {forecast.main.temp}°C
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  error: {
    color: 'red',
  },
});

export default WeatherApp;
