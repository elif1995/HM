import  { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Pressable, Alert } from 'react-native';
import {Calendar} from 'react-native-calendars';
import {  FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addEvents } from '../store/redux/EventSlice.js';



function EventForm (props) {
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('')
  
  
  function eventDescriptionInputHandler(enteredText){
    setDescription(enteredText);
    
  }

  function eventDateInputHandler(enteredDate){
    setSelectedDate(enteredDate)
  }

  function addGoalHandler(){

    if( description.length <= 0){
      Alert.alert('שגיאה','אנא מלא את השדות הרייקים', [{
        text: 'הבנתי', style: 'destructive'
      }] )
    }else{
   
    props.addEventHandler(selectedDate, description);
    setDescription('')
    setSelectedDate(null)
    
  }
    
  }

  // const onDateSelected = (date) => {
  //   dispatch(addEvents({date:date, description: description}));
  // }

  // function handleSubmit ()  {


  //   if(selectedDate !== ''){
  //     dispatch(addEvents({date:selectedDate, description:description}));
  //   }

  
  // }


  return (
    <Modal visible={props.visible} animationType='slide'>
      <Pressable onPress={props.onClose}><FontAwesome name="window-close-o" size={30}/></Pressable>
      <View style={styles.container}>
        
        <Calendar 
            style={{
              borderWidth: 1,
              borderColor: 'lightgray',
              padding: 20,
              borderRadius:10
            }}
            // Initially visible month. Default = now
            initialDate={selectedDate}
           
            onDayPress={day => {
              
              // const eventDate = new Date(day.dateString).toISOString();
              
              eventDateInputHandler(day.dateString);
            }}

            
            // onDateSelected={onDateSelected}
          />
        
        <TextInput style={styles.textInput}
          placeholder="תיאור האירוע"
          value={description}
          onChangeText={eventDescriptionInputHandler}
        />
        <Button
          title="יצירת אירוע"
          onPress={addGoalHandler}
        />
      </View>
    </Modal>
  );
};

export default EventForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    
    
    padding: 16
  },
  textInput:{
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'right',
    marginVertical:12,
    padding: 12,
    backgroundColor:'white',
    borderRadius: 6,
    fontSize:20,
  },
})