import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StatusBar as RNStatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './utils/Navigator';

import { Provider } from 'react-redux';
import store from './utils/ReduxStore';

export default function App() {

  RNStatusBar.setBarStyle('dark-content'); // Sets the status bar text color to white
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
