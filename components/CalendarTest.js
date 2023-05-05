import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

export default function CalendarTest(){

const [currentDate, setCurrentDate] = useState(moment());

const renderCalendar = () => {
  return (
    <Calendar
      onDayPress={(day) => {
        setCurrentDate(moment(day.dateString));
      }}
      markedDates={{ [currentDate.format('YYYY-MM-DD')]: { selected: true } }}
    />
  );
};

const renderTime = () => {
  return (
    <Text style={styles.time}>
      {currentDate.format('h:mm a')}
    </Text>
  );
};

const renderDate = () => {
  return (
    <Text style={styles.date}>
      {currentDate.format('dddd, MMMM Do')}
    </Text>
  );
};

return (
  <View style={styles.container}>
    {renderCalendar()}
    <View style={styles.dateTimeContainer}>
      {renderTime()}
      {renderDate()}
    </View>
  </View>
);
}
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  time: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 20,
  },
});