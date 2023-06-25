import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import EventIcon from '../assets/eventIcon.png';
import LocIcon from '../assets/locIcon.png';
import TimeIcon from '../assets/timeIcon.png';
import StarIcon from '../assets/starIcon.png';
import ScrollViewWrapper from './ScrollViewWrapper';

// settings that are passed to the calendar
const staticCalendarProps = {
  showSixWeeks: true,
  disableMonthChange: true,
};

// month and day names to show full date in calendar
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * A class to represent a date in the format YYYY-MM-DD.
 */
class YMDDate {
  year;
  month;
  day;
  strform;

  /**
   * Creates a YMDDdate object to store a date with easy access to the year, month, and day.
   * 
   * @param {String} dateString takes a string in the format YYYY-MM-DD
   */
  constructor(dateString) {
    this.strform = dateString;
    let dateArray = dateString.split('-');
    this.year = parseInt(dateArray[0]);
    this.month = parseInt(dateArray[1]);
    this.day = parseInt(dateArray[2]);
  }
}

/**
 * Converts today's date to a YMDDate object.
 * 
 * @returns {YMDDate} converts today's date to a YMDDdate object
 */
function dateToYMD() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return new YMDDate(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
}

/**
 * Converts a YMDDate object to a string in the format "Day, Month Day, Year".
 * 
 * @param {YMDDate} ymd YMDDate object
 * @returns {String} string in the format "Day, Month Day, Year"
 */
function YMDToLong(ymd) {
  let date = new Date(ymd.year, ymd.month-1, ymd.day);
  return `${dayNames[date.getDay()]}, ${monthNames[ymd.month-1]} ${ymd.day}, ${ymd.year}`;
}

/**
 * Component used to display event information.
 * 
 * @param {Object} eventData
 * @returns {JSX.Element} a component that displays the event information
 */
function Event({ eventData }) {
  let time = JSON.stringify(eventData.date).split('T')[1].replace('Z', '').replace('"', '').substring(0, 5)
  if(parseInt(time.substring(0, 2)) > 11){
    time = parseInt(time.substring(0, 2)) - 12 + time.substring(2, 5) + " pm"
  }
  else if(parseInt(time.substring(0, 1)) == 0 && parseInt(time.substring (1, 2)) == 0){
    time = 12 + time.substring(2, 5) + " am"
  }
  else if(parseInt(time.substring(0, 1)) == 0){
    time = time.substring (1, 5) + " am"
  }
  else{
    time = time + " am"
  }
  return (
    <View style={styles.eventcontainer}>
      <Text style = {styles.h2}>{JSON.stringify(eventData.title).replaceAll('"', '')}</Text>
      <View style = {styles.row}>
        <Image style = {styles.icon2} source = {LocIcon}/>
        <Text style = {styles.body}>{JSON.stringify(eventData.location).replaceAll('"', '')}</Text>
      </View>
      <View style = {styles.row}>
        <Image style = {styles.icon2} source = {TimeIcon}/>
        <Text style = {styles.body}>{time}</Text>
      </View>
      <View style = {styles.row}>
        <Image style = {styles.icon2} source = {StarIcon}/>
        <Text style = {styles.body}>{JSON.stringify(eventData.points).replaceAll('"', '')} points</Text>
      </View>
    </View>
  )
}

/**
 * The events screen contains an interactive calendar that will also display events on the selected day.
 * 
 * @returns {JSX.Element} The events screen
 */
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
        <ScrollViewWrapper contentContainerStyle={[styles.container, {paddingBottom: '5%'}]}>
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
            <Image style = {styles.icon1} source = {EventIcon}/>
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
      </ScrollViewWrapper>
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
    fontSize: 15,
    marginLeft: '5%',  
    fontWeight: 'light',
    marginBottom: '5%'
  },
  row: {
    flexDirection: 'row',
  },
  icon1: {
    height: 36,
    width: 36,
    margin: '5%'
  },
  icon2: {
    height: 21,
    width: 21,
    marginLeft: '5%'
  }
});