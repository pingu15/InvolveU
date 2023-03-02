import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import EventIcon from '../assets/eventIcon.png';

const staticCalendarProps = {
  showSixWeeks: true,
  disableMonthChange: true,
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class YMDDate {
  year;
  month;
  day;
  strform;

  constructor(dateString) {
    this.strform = dateString;
    let dateArray = dateString.split('-');
    this.year = parseInt(dateArray[0]);
    this.month = parseInt(dateArray[1]);
    this.day = parseInt(dateArray[2]);
  }
}

function dateToYMD() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return new YMDDate(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
}

function YMDToLong(ymd) {
  let date = new Date(ymd.year, ymd.month-1, ymd.day);
  return `${dayNames[date.getDay()]}, ${monthNames[ymd.month-1]} ${ymd.day}, ${ymd.year}`;
}

function Event({ eventData }) {
  return (
    <View style={styles.eventcontainer}>
      <Text style = {styles.h2}>{JSON.stringify(eventData.title)}</Text>
      <Text>{JSON.stringify(eventData.location)}</Text>
      <Text>{JSON.stringify(eventData.points)}</Text>
    </View>
  )
}

export default function EventsScreen() {

  const events = useSelector(state => state.eventsData);
  const today = dateToYMD();

  const [selectedDay, setSelectedDay] = useState(today);
  const [displayedDate, setDisplayedDate] = useState(today);
  const [currentKey, setCurrentKey] = useState(new Date());
  const [eventDays, setEventDays] = useState([]);
  const [eventsToday, setEventsToday] = useState([]);

  useEffect (() => {
    setSelectedDay(today);
    setDisplayedDate(today);

    if (events) {
      let tempEventDays = new Set();
      for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let startDate = new YMDDate(event.date.split('T')[0]);

        let currentYear = startDate.year;
        let currentMonth = startDate.month;
        let currentDay = startDate.day;

        tempEventDays.add(`${currentYear}-${currentMonth < 10 ? '0'+currentMonth : currentMonth}-${currentDay < 10 ? '0'+currentDay : currentDay}`);
      }
      setEventDays(Array.from(tempEventDays));
    } else {
      setEventDays([]);
    }
  }, [events]);

  useEffect(() => {
    if (events) {
      let tempEventsToday = [];
      for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let startDate = new YMDDate(event.date.split('T')[0]);

        let currentYear = startDate.year;
        let currentMonth = startDate.month;
        let currentDay = startDate.day;

        if (currentYear === selectedDay.year && currentMonth === selectedDay.month && currentDay === selectedDay.day) {
          tempEventsToday.push(event);
        }
      }
      setEventsToday(tempEventsToday);
    } else {
      setEventsToday([]);
    }
  }, [selectedDay]);

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.calendarcontainer}>
          <View style={{height: "3%"}}></View>
          <Calendar 
            key={currentKey.toISOString()}
            theme = {
              {
                textSectionTitleColor: '#000',
                textSectionTitleDisabledColor: '#b8b8b8',
                todayTextColor: '#96cdff',
                textDisabledColor: '#b8b8b8',
                dotColor: '#00f593',
                selectedDotColor: '#fff',
                arrowColor: '#0a2945',
                disabledArrowColor: '#4a4a4a',
              }
            }
            {...staticCalendarProps}
            onDayPress={(day) => {
              setSelectedDay(new YMDDate(day.dateString));
            }}
            markedDates={{
              [selectedDay.strform]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: '#6171ff',
                selectedTextColor: today.strform == selectedDay.strform ? '#96cdff' : '#fff',
              },  

              ...eventDays.reduce((obj, eventDay) => {
                obj[eventDay] = {
                  marked: true,
                  dotColor: '#96cdff',
                  selected: selectedDay.strform === eventDay,
                  disableTouchEvent: selectedDay.strform === eventDay,
                  selectedColor: '#6171ff',
                  selectedTextColor: today.strform == selectedDay.strform ? '#96cdff' : '#fff',
                };
                return obj;
              }, {}),
            }}
            onPressArrowLeft={(substractMonth) => {
              let newYear = displayedDate.year;
              let newMonth = displayedDate.month - 1;
              let newDay = displayedDate.day;
              if (newMonth < 1) {
                newMonth = 12;
                newYear--;
              }
              setDisplayedDate(new YMDDate(`${newYear}-${newMonth < 10 ? '0' + newMonth : newMonth}-${newDay < 10 ? '0' + newDay : newDay}`));
              substractMonth();
            }}
            onPressArrowRight={(addMonth) => {
              let newYear = displayedDate.year;
              let newMonth = displayedDate.month + 1;
              let newDay = displayedDate.day;
              if (newMonth > 12) {
                newMonth = 1;
                newYear++;
              }
              setDisplayedDate(new YMDDate(`${newYear}-${newMonth < 10 ? '0' + newMonth : newMonth}-${newDay < 10 ? '0' + newDay : newDay}`));
              addMonth();
            }}
          />
          <View style={{marginHorizontal: "5%", marginTop: "3%", alignItems: "flex-end", backgroundColor: "transparent"}}>
            <TouchableOpacity
              disabled={displayedDate.strform == today.strform}
              onPress={() => {
                setSelectedDay(today); 
                setCurrentKey(new Date());
                setDisplayedDate(today);
              }}
            >
              <Text style={{fontSize: 16, textAlign: 'right', fontWeight: displayedDate.strform == today.strform ? "normal" : "bold", color: displayedDate.strform == today.strform ? '#b3b3b3' : '#2280ff'}}>
                  Return to Today
                </Text>
            </TouchableOpacity>
          </View> 
        </View>
        <View style={styles.eventscontainer}>
          <View style={styles.row}>
            <Image style = {styles.icon} source = {EventIcon}/>
            <Text style = {styles.h1}>Events</Text>
          </View>
          <Text style={styles.text}>{YMDToLong(selectedDay)}</Text>
          {eventsToday.length == 0 ? <Text style={styles.noEvents}>No Events</Text> : <></>}
          {eventsToday.map((event, index) => {
            return (
              <Event key={index} eventData={event} />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  calendarcontainer: {
    flexGrow: 0.1,
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
  eventcontainer: {
    flexGrow: 1,
    margin: "5%",
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#ffeacc",
    alignSelf: "center",
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#808d9e',
    marginHorizontal: "5%",
  },
  noEvents: {
    fontSize: 16,
    marginTop: "5%",
    marginHorizontal: "5%",
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: "5%",
    color: '#1D1E25',
    marginTop: "5%"
  },
  h2: {
    fontSize: 20,
    fontWeight: 'medium',
    margin: '5%',
  },
  body:{
    fontSize: 15
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    height: 36,
    width: 36,
    margin: '5%'
  },
});