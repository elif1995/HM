import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';
import {View, Text, Modal, TouchableOpacity, StyleSheet, TextInput,} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addDaysEvents } from '../store/redux/DaysCalendar.js';

const days = ['תבחר יום','ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const hours = [ '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',  '21:00', '22:00', '23:00'];
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];


export default function AddKidsCalendar(props){
  const dispatch = useDispatch()

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');

  const[events, setEvents] = useState([])


  const handleEventsAdd = () => {
    const event = {
      id: uuid.v4(),
      selectedDay: selectedDay,
      selectedHour: selectedHour ,
      description: description,
      color: color 
    }
    
    
    dispatch(addDaysEvents(event))
    props.handleAddEvent()
    setSelectedDay(null);
    setSelectedHour(null);
    setDescription('');
    setColor('');

    
  }

  return(

    
      <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>הוסף למערכת השעות</Text>
      <Picker
        
        selectedValue={selectedDay}
        style={styles.picker}
        onValueChange={itemValue => setSelectedDay(itemValue)}
            >
        {days.map(day => (
          <Picker.Item key={day} label={day} value={day} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedHour}
        style={styles.picker}
        onValueChange={itemValue => setSelectedHour(itemValue)}
      >
        {hours.map(hour => (
          <Picker.Item key={hour} label={hour} value={hour} />
        ))}
      </Picker>
      <TextInput
        placeholder="הוסף נושא"
        value={description}
        style={styles.textInput}
        onChangeText={text => setDescription(text)}
      />
      <Picker
        selectedValue={color}
        style={styles.picker}
        onValueChange={itemValue => setColor(itemValue)}
      >
        {colors.map(color => (
          <Picker.Item key={color} label={color} value={color} />
        ))}
      </Picker>
      
        <TouchableOpacity style={styles.addEventButton} onPress={handleEventsAdd}>
          <Text style={styles.addEventButtonText}>הוסף</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => props.setModalVisible(false)}>
          <Text style={styles.cancelButtonText}>בטל</Text>
        </TouchableOpacity>
      </View>
    
  
    )


}

const styles = StyleSheet.create({
  
  
  modalContainer: {
    
    alignItems: 'center',
 
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  picker: {
    width: '80%',
    marginBottom: 20,
  },
  textInput: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
  },
  addEventButton: {
    width: '80%',
    padding: 10,
    backgroundColor: 'lightgreen',
    borderColor: 'green',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation:3
  },
  addEventButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cancelButton: {
    width: '80%',
    padding: 10,
    backgroundColor: 'pink',
    borderColor: 'red',
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:4,
    elevation:3
  },
  cancelButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});