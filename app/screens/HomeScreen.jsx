import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  const [user, setUser] = useState({username:"Loading", points: "Loading", rank: "Loading", grade: "Loading"});

  useEffect(() => {
    AsyncStorage.getItem('@user').then((user) => {
      if (user == null) {
        console.log("user is null");
      } else {
        console.log("Recieved data to homescreen:" + user);
        setUser(JSON.parse(user));
      }
    }).catch((error) => {
      console.log(error.message);
    });
  }, [user]);

  return (
      <View style={styles.container}>
          <Summary user={user}/>
          <Rank user={user}/>
      </View>
  );
}

function Summary({ user }) {
  return(
    <View style={[styles.box, {height: '35%'}]}>
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

function Rank({user}){
  return(
    <View style = {[styles.box, {height: '40%'}, {marginTop: '0%'}]}>
      <View style = {styles.row}>
        <Image style = {styles.icon} source={RankIcon}/>
        <Text style={styles.h1}>Rank</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1D1E25',
    borderTopWidth: 20,
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
    alignItems: 'left',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    height: 36,
    width: 36,
    margin: 15
  }
});