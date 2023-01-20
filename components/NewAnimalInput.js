import {ActivityIndicator, StyleSheet, View, TextInput, Button, Modal, Text, Image, Pressable, Platform} from 'react-native'
import {useState, useEffect} from 'react'
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';




function GoalInput (props) {
  
  
  

  const[enteredImage, setEnteredImage] = useState();
  const[enteredName, setEnteredName] = useState('');
  const[enteredage, setEnteredAge] = useState('');
  const[enteredWalkNotifications, setEnteredWalkNotifications] =  useState();
  const[enteredChip, setEnteredChip] = useState('');
  const[enteredAppointment, setEnteredAppointment] = useState('')

  const[date, setDate] = useState(new Date());
  const[mode, setMode] = useState('date')
  const[show, setShow] = useState(false)
  const[text, setText] = useState('Empty')
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate  ;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate) 
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime =  + tempDate.getMinutes() + ' : ' + tempDate.getHours()
    setEnteredAppointment(fDate  + ' (' + fTime + ')')
    
    props.handleOnChange(enteredAppointment, 'AppointmentData')
    
    
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode)
  }

  

  useEffect(() => {
    
      setEnteredImage(undefined)
    
    
  },[props.visible])


  




  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect:[4,3],
      quality: 1,
    })
    
    if(!result.cancelled){
      setEnteredImage(result.uri)
      props.handleOnChange(result.uri, 'Image')
      
    }
    
  }

  


  

  return(
    <Modal visible={props.visible} animationType='slide'>
    <View style={styles.inputContainer}>        
        {enteredImage !== undefined  ? 
        <View styles={{flexDirection: 'row'}}>
          <Pressable onPress={PickImage} >
          <View style={styles.imageButton} >
            <Text >החלף תמונה</Text>
          {/* <MaterialIcons name="cloud-done" size={25} color='green'/> */}
            <Image source={{uri: enteredImage}} style={styles.imageUploaded} />

          </View>
        </Pressable>
        </View> 
        : 
        <Pressable onPress={PickImage} >
          <View style={styles.imageButton} >
            <Text >הוסף תמונה</Text>
            <MaterialIcons name="image" size={40}/> 
          </View>
        </Pressable>}
        <TextInput  style={styles.textInput} 
        placeholder="שם בעל החיים" 
        label="name"
        onChangeText = {(text) => props.handleOnChange(text,'Name') } 
        maxLength={15} 
        required={true}
        />

        <TextInput  style={styles.textInput} 
        placeholder="גיל בעל החיים"  
        label="age"
        maxLength={5} 
          
        keyboardType='number-pad'
        onChangeText = {(text) =>  props.handleOnChange(text, 'Age')} 
        autoCorrect={false}
        />
        <TextInput  style={styles.textInput} 
        placeholder="הוסף התראה לטיול כל"  
        label='walkNotifications'
        maxLength={5} 
        autoCorrect={false}
        onChangeText = {(text) => props.handleOnChange(text, 'WalkNotifications')} 
        />
        <TextInput  style={styles.textInput} 
        placeholder="מספר השבב"  
        label="ChipNumber"
        maxLength={5} 
        autoCorrect={false}
        onChangeText = {(text) => props.handleOnChange(text, 'ChipNumber')} 
        />
        
        
        <View style={{flexDirection: 'row'}}>
          <View style={{margin: 10}}>
            <Button title="הוסף תאריך לטיפול הבא" onPress={() => showMode("date")} />
          </View>
          <View style={{margin: 10}}>
            <Button title="הוסף שעה לטיפול הבא" onPress={() => showMode("time")} />
          </View>
        </View>
        <Text style={[styles.textInput, {textAlign:'center', backgroundColor:'lightgrey'}]} >{enteredAppointment}</Text>

        {show && <DateTimePicker testID='dateTimePicker' display="default" value={date} mode={mode} is24Hour={true} onChange={onChange}/>}

        <View style={styles.buttonContainer}>
          <Pressable onPress={props.AddAnimalHandler} style={[styles.button, {borderColor:'green', borderWidth: 1}]}><Text style={{ color:'green',fontWeight: 'bold',fontSize:18, padding:10}}   >הוסף </Text>{props.Loader && <ActivityIndicator />}</Pressable>
          
          <Pressable onPress={props.onClose} style={[styles.button, {borderColor:'red', borderWidth: 1}]}><Text style={{color: 'red', fontWeight: 'bold', fontSize:18}}  >בטל</Text></Pressable>
          
        </View>
         
      </View>
    </Modal>
  )
}

export default GoalInput

const styles = StyleSheet.create({
  inputContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
    padding: 16
  },
  imageButton: {
    backgroundColor:'#DFFFE9',
    width: '90%',
    flexDirection: 'row', 
    margin:16,
    padding: 8,
    alignItems: 'center',
    borderRadius: 6,
    elevation: 4,
  }
  ,
  textInput:{
    borderWidth: 1,
    borderColor: '#daeaf6',
    width: '90%',
    textAlign: 'right',
    margin:12,
    padding: 18,
    backgroundColor:'#DFFFE9',
    borderRadius: 6
  },
  buttonContainer:{
    marginTop:16,
    flexDirection:"row",

  },
  button: {
    width: 100,
    margin: 8,
    backgroundColor:'white',
    borderRadius: 6,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageUploaded: {
    width:30,
    height: 30,
    borderRadius:50,
    marginLeft:10
  }
  
})