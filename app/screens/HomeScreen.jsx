import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
/* image imports */
import Welcomeicon from '../assets/welcomeIcon.png';
import RankIcon from '../assets/rankIcon.png';
import UpArrow from '../assets/upArrow.png';
import StoreIcon from '../assets/storeIcon.png';
import { MaterialIcons } from '@expo/vector-icons'; 

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useSelector } from 'react-redux';

//SplashScreen.preventAutoHideAsync();

export default function HomeScreen({ navigation }) {
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

  const user = useSelector(state => state.userData);

  return (
    <View style = {styles.container}>
      <ScrollView contentContainerStyle={[styles.container, {paddingBottom: '5%'}]}>
          <Summary user = {user}/>
          <Rank user = {user} navigation={navigation}/>
          <Store navigation={navigation}/>
      </ScrollView>
    </View>
  );
}

function Summary({ user }) {
  return(
    <View style={[styles.box, {height: '29%'}]}>
      <View style = {styles.row}>
        <Image style = {styles.icon} source={Welcomeicon}/>
        <Text style={styles.h1}>Welcome, {user.username}!</Text>
      </View>
      <Text style = {styles.text}>Total Points:</Text>
      <View style = {[styles.row, {marginTop: '5%'}]}>
        <Text style = {styles.number1}>{user.points}</Text>
        <Image style = {[styles.icon, {marginRight: '0%'}, {marginTop: '6%'}]} source = {UpArrow}/>
        <Text style = {styles.percent}>25%</Text>
      </View>
    </View>
  );
}

function Rank({ user, navigation }){
  return(
    <TouchableOpacity style = {[styles.box, {height: '44%'}, {marginTop: '0%'}]} onPress={() => navigation.navigate('Rank')}>
      <View style = {styles.rank}>
        <Image style = {styles.icon} source={RankIcon}/>
        <Text style={styles.h1}>Rank</Text>
        <MaterialIcons name="keyboard-arrow-right" size={30} color="black" style={styles.arrow}/>
      </View>
      <Text style = {styles.text}>Among grade {user.grade}s:</Text>
      <View style = {[styles.row, {marginTop: '3%'}]}>
        <Text style = {styles.number1}>6</Text>
        <Text style = {styles.number2}>of 247</Text>
      </View>
      <Text style = {styles.text}>Among all grades:</Text>
      <View style = {[styles.row, {marginTop: '3%'}]}>
        <Text style = {styles.number1}>24</Text>
        <Text style = {styles.number2}>of 1043</Text>
      </View>
    </TouchableOpacity>
  );
}

function Store({ navigation }){
  return(
    <TouchableOpacity style = {[styles.box, {height: '12%'}, {marginTop: '0%'}]} onPress = {() => navigation.navigate('Store')}>
      <View style = {styles.rank}>
        <Image style = {styles.icon} source={StoreIcon}/>
        <Text style={styles.h1}>Store</Text>
        <MaterialIcons name="keyboard-arrow-right" size={30} color="black" style={styles.arrow}/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: "10%",
    color: '#1D1E25',
    marginTop: "5%"
  },
  text: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#808d9e',
    marginLeft: '5%',
  },
  number1: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1D1E25',
    marginLeft: '5%'
  },
  number2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808d9e',
    marginTop: '8%',
    marginLeft: '5%',
  },
  percent: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#009c35',
    marginTop: '7%',
    marginLeft: '0%'
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
  },
  box: {
    margin: '5%',
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  shopBox: {
    margin: '5%',
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#ffe9e9',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 0,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    height: 36,
    width: 36,
    margin: '5%'
  },
  arrow: {
    marginTop: '5%',
    marginLeft: '50%',
  },
  rank: {
    flexDirection: 'row',
    width: '100%',
  }
});