import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './utils/Navigator';

export default function App() {
  StatusBar.setBarStyle('dark-content'); // Sets the status bar text color to white
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
