import React, { useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
/* image imports */
import Welcomeicon from '../assets/welcomeIcon.png';
import RankIcon from '../assets/rankIcon.png';
import UpArrow from '../assets/upArrow.png';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

//SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  /*const [fontsLoaded] = useFonts({
    'Inter': require('../assets/inter-regular-1.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }*/

  return (
      <View style={styles.container}>
          <Summary/>
          <Rank/>
      </View>
  );
}

function Summary() {
  return(
    <View style={[styles.box, {height: '35%'}]}>
      <View style = {styles.row}>
        <Image style = {styles.icon} source={Welcomeicon}/>
        <Text style={styles.h1}>Welcome, MaxBad!</Text>
      </View>
      <Text style = {styles.text}>Total Points:</Text>
      <View style = {[styles.row, {marginTop: '5%'}]}>
        <Text style = {styles.number1}>1560</Text>
        <Image style = {[styles.icon, {marginRight: '0%'}, {marginTop: '6%'}]} source = {UpArrow}/>
        <Text style = {styles.percent}>25%</Text>
      </View>
    </View>
  );
}

function Rank(){
  return(
    <View style = {[styles.box, {height: '40%'}, {marginTop: '0%'}]}>
      <View style = {styles.row}>
        <Image style = {styles.icon} source={RankIcon}/>
        <Text style={styles.h1}>Rank</Text>
      </View>
      <Text style = {styles.text}>Among Grade grades:</Text>
      <View style = {[styles.row, {marginTop: '3%'}]}>
        <Text style = {styles.number1}>6</Text>
        <Text style = {styles.number2}>of 247</Text>
      </View>
      <Text style = {styles.text}>Among Grade grades:</Text>
      <View style = {[styles.row, {marginTop: '3%'}]}>
        <Text style = {styles.number1}>24</Text>
        <Text style = {styles.number2}>of 1043</Text>
      </View>
    </View>
  );
}
