import {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Pressable, FlatList} from 'react-native';
import { Agenda, DateData} from 'react-native-calendars';
import {  FontAwesome } from '@expo/vector-icons';
import {LocaleConfig} from 'react-native-calendars';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';
import { addEvents } from '../store/redux/EventSlice.js';



import EventForm from './../components/EventForm';

LocaleConfig.locales['il'] = {
  monthNames: [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר'
  ],
  monthNamesShort: ['ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר'],
  dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  dayNamesShort: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  today: "היום"
};
LocaleConfig.defaultLocale = 'il';



function EventsCalendar() {
  // useState hook to manage the state of the calendar's items
  const [items, setItems] = useState({});
  // useState hook to manage the visibility of the "Add Event" modal
  const [visible, setVisible] = useState(false);

   // useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();
    // useSelector hook to access the events state from the Redux store
  const Events = useSelector((state) => state.events);

   // function to handle adding a new event to the calendar
   const addEventHandler = (enteredEventDate, enteredEventDescription, enteredEventHour, enteredEventColor) => {

    // dispatch an action to add the new event to the events state in the Redux store
    dispatch(addEvents({
      date: enteredEventDate,name: enteredEventDescription, hour: enteredEventHour, color: enteredEventColor
    }))
    
  }
  // function to handle opening the "Add Event" modal
  function handleOpenModal(){
    setVisible(true)
  }

  // function to handle closing the "Add Event" modal
  function handleCloseModal(){
    setVisible(false)
  }

  
  // useEffect hook to load events from the Redux store when the component mounts
  
  useEffect(() => {
    renderItems
  },[Events])

  // function to load events from the Redux store
  function loadEvents() {
    let items = {};
        // use a for loop to add all the days of the year to the items object
  for (let i = 1; i <= 365; i++) {
    const date = new Date(new Date().getFullYear(), 0, i);
    const strTime = date.toISOString().split('T')[0];
    items[strTime] = [];
    
  }

  // use a forEach loop to add all events
  if(Array.isArray(Events)){
    Events.forEach(event => {
      if (items[event.date]) {
        items[event.date].push({
          name: event.name,
          hour: event.hour,
          height: Math.max(100, Math.floor(Math.random() * 150)),
          day: event.date,
          color: event.color
        });
      }
    });

  


     
    setItems(items);}
  }
   
  
   // function to render an event on the calendar
  const renderItems = (item) => {
    if(item.color === "yellow"){

      
        return(
          <View style={{borderColor:item.color,borderWidth: 3, elevation:3,backgroundColor: 'white', margin: 10, padding:10, height: 100 , borderRadius: 10}}>
            <Text style={{fontWeight:'bold', fontSize:16}}>נושא: <Text style={{fontWeight:'normal', fontSize:16}}>{item.name}</Text> </Text>
            <Text style={{fontWeight:'bold', fontSize:16}}>שעה: <Text style={{fontWeight:'normal', fontSize:16}}>{item.hour}</Text> </Text>
          </View>
        )
     
    }
  }
  // function to render an empty date on the calendar
  const renderEmptyDate = () => {
    return (
      <View style={{ margin: 10, padding:10, height: 100 , borderRadius: 10}}>
        
      </View>
    );
  }
  
  
  const color = 'yellow'
  console.log(items)

  return (
    <View style={styles.container}>
      
      {/* "Add Event" button that opens the modal */}
      <Pressable style={styles.addCalendarButton} onPress={handleOpenModal}><Text style={{color: '#3c99dc',fontWeight: 'bold', fontSize: 20}}> הוסף אירוע </Text><FontAwesome name='calendar-plus-o' size={30} color='green' /></Pressable>
      
      {/* EventForm component to add new events to the calendar */}
      <EventForm visible={visible} onClose={handleCloseModal} addEventHandler={addEventHandler} color={color}/>

      {/* Agenda component to display the events calendar */}
        <Agenda
         items={items}
         showClosingKnob
         loadItemsForMonth={loadEvents}
         renderItem={renderItems}
         renderEmptyDate={renderEmptyDate}
         
         theme={{ agendaKnobColor: 'lightgreen'}}
        />
      
    </View>
  )
}

export default EventsCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  addCalendarButton:{
    
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    backgroundColor: "#fff",
    borderRadius:15,
  
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    margin:10,
    
},
emptyDate: {
  height: 15,
  flex: 1,
  paddingTop: 30
}
})