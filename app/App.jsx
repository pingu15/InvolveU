import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StatusBar as RNStatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './utils/Navigator';

export default function App() {
  RNStatusBar.setBarStyle('dark-content'); // Sets the status bar text color to white
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
