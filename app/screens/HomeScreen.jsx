import React, { useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import Welcomeicon from '../assets/welcomeIcon.png';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  return (
      <View style={styles.container}>
          <Summary/>
          <Rank/>
      </View>
  );
}

function Summary() {
  return(
    <View style={styles.box}>
      <Image style = {styles.icon} source={Welcomeicon}/>
      <Text style={styles.h1}>Welcome, MaxBad!</Text>
    </View>
  );
}

function Rank(){
  return(
    <View style = {styles.box}>
      <Text style = {styles.h1}>Rank</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'poppins',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1D1E25',
    borderTopWidth: 20,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
  },
  box: {
    flexGrow: 1,
    margin: '5%',
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    height: 36,
    width: 36,
  }
});