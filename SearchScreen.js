// screens/SearchScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      navigation.navigate('Weather', { city });
    } else {
      alert('Please enter a city name');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for a City</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default SearchScreen;
