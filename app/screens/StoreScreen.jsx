import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Lock from '../assets/lock.png';
import StoreIcon from '../assets/storeIcon.png';
import Star from '../assets/star.png';
import Cat from '../assets/catloading.jpg';
import Shane from '../assets/shane.png';

export default function StoreScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style = {styles.box}>
          <View style = {styles.row}>
            <Image style = {styles.icon} source={StoreIcon}/>
            <Text style={styles.h1}>Store</Text>
          </View>
          <ShopItem itemName = {'Toque'} points = {1000} image = {StoreIcon}/>
          <ShopItem itemName = {'CAT'} points = {100000} image = {Cat}/>
          <ShopItem itemName = {'shinchan'} points = {1} image = {Shane}/>
        </View>
      </ScrollView>
    </View>
  );
}

function ShopItem({itemName, points, image}){
  return(
    <View style = {styles.shopBox}>
    <View style = {styles.row}>
      <Image style = {[styles.icon, {height: 21}, {width: 21}, {marginBottom: 3}]} source = {Lock}/>
      <Text style = {[styles.h2, {marginTop: 10}]}>{itemName}</Text>
    </View>
    <View style = {styles.row}>
      <Image style = {[styles.icon, {height: 21}, {width: 21}]} source = {Star}/>
      <Text>{points} points</Text>
    </View>
    <Image style = {styles.image} source = {image}/>
  </View>
  )
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
  image: {
    margin: '5%'
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
  shopBox: {
    margin: '5%',
    width: '90%',
    borderRadius: 8,
    backgroundColor: '#ffe9e9',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'left',
    marginTop: '0%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1D1E25',
  },
  h2: {
    fontSize: 20,
    fontWeight: `medium`,
  },
  points: {
    fontSize: 15,
    fontWeight: 'light',
  }
});