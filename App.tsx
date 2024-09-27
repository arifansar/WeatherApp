import React, {useEffect, useRef, useState} from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
//import WeatherApp from './src/components/WeatherApp';
import WeatherApp from './src/components/WeatherApp';

const App = () => {
  return (
    <Provider store={store}>
      <WeatherApp />
    </Provider>
  );
};

export default App;
