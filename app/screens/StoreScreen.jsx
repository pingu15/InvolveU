import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StoreScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Store Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});