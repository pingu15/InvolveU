import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import RankIcon from '../assets/rankIcon.png';

export default function RankScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style = {styles.box}>
            <View style = {styles.row}>
                <Image style = {styles.icon} source={RankIcon}/>
                <Text style={styles.h1}>Rank</Text>
            </View>
            <Text style = {styles.h2}>Among grade s:</Text>
            <View style = {styles.row}>
                <Text style = {styles.number1}>6</Text>
                <Text style = {styles.number2}>of 247</Text>
            </View>
            <Text style = {styles.h2}>Leaderboard</Text>
            <View style = {styles.row}>
                <Text style = {styles.username}>1. ahh</Text>
                <Text style = {styles.points}>1960</Text>
            </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 36,
    width: 36,
    margin: '5%'
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
    alignItems: 'left',
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1D1E25',
  },
  h2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d1e25',
    marginLeft: '5%',
    marginBottom: '5%'
  },
  number1: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#1D1E25',
    marginLeft: '5%',
    marginBottom: '5%',
  },
  number2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808d9e',
    marginLeft: '5%',
  },
  username: {
    fontSize: 14,
    color: '#1d1e25',
    marginLeft: '5%'
  },
  points: {
    fontSize: 14,
    color: '#808d9e',
    textAlign: 'right',
    width: '75%'
  }
});