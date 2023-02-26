import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';

export default function EventsScreen() {

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.calendarcontainer}>
          <View style={{height: "3%"}}></View>
          <Calendar />
        </View>
        <View style={styles.eventscontainer}>
          <Text style={styles.text}>Events</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarcontainer: {
    flexGrow: 0.03,
    marginHorizontal: "5%",
    marginTop: "5%",
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },
  eventscontainer: {
    flexGrow: 1,
    margin: "5%",
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});