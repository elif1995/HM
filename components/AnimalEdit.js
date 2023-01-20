import {useState, useEffect} from 'react';
import {  useDispatch } from 'react-redux';
import {View, Text, StyleSheet, Image, Modal, Pressable, TextInput, ActivityIndicator} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import {editAnimals} from '../store/redux/AnimalsSlice'

function AnimalEdit(props){
  
  const[changedLoader, setChangedLoader] = useState(false)
  const[changedImage, setChangedImage] = useState();
  const[name, setName] = useState(props.animalData.Name);
  const[age, setAge] = useState(props.animalData.Age);
  const[walkNotifications, setWalkNotifications] = useState(props.animalData.WalkNotifications);
  const [chipNumber, setChipNumber] = useState(props.animalData.ChipNumber);
  const [appointment, setAppointment] = useState(props.animalData.AppointmentData)

  const dispatch = useDispatch();

  // useEffect(() => {
    
  // },[changedImage, name, age, walkNotifications, chipNumber, appointment])


  




  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect:[4,3],
      quality: 1,
    })
      
    
  
    if(!result.cancelled){
      
      dispatch(editAnimals({
        Name:props.animalData.Name, 
        newImage:result.uri, 
        
      }))
      changedImage(result.uri)

    }
  }

  function handleEdit(){
    
    setChangedLoader(!changedLoader)
    setTimeout(()=> {
      dispatch(editAnimals({
        Name:props.animalData.Name, 
        
        newName:name, 
        newAge: age, 
        newWalk: walkNotifications, 
        newChipNumber:chipNumber, 
        newAppointment: appointment 
      }))
      setChangedLoader(false)
      props.onClose()
    }, 1000)

  }

 


  return(
    <Modal visible={props.visible} animationType='slide'>
    <View style={styles.inputContainer}>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', width:'100%'}}>
          <Pressable onPress={PickImage} >
            <View style={styles.imageButton} >
              <Text >החלף תמונה</Text>
              <MaterialIcons name="image" size={40}/> 
            </View>
          </Pressable>
          <Image source={{uri: props.animalData.Image}} style={styles.image} />
        </View>
        
          <Text style={styles.textLable}>שם</Text>
          
        <TextInput  style={styles.textInput} 
        placeholder={props.animalData.Name} 
        label="name"
        
        maxLength={15} 
        onChangeText = {(text) => setName(text) } 
        />


        <Text style={styles.textLable}>גיל</Text>
        <TextInput  style={styles.textInput} 
        placeholder={props.animalData.Age}  
        label="age"
        maxLength={5} 
        keyboardType='number-pad'
        autoCorrect={false}
        
        onChangeText = {(text) => setAge(text) }
        />

        <Text style={styles.textLable}>התראה לטיול כל</Text>
        <TextInput  style={styles.textInput} 
        placeholder={props.animalData.WalkNotifications}  
        label='walkNotifications'
        maxLength={5} 
        autoCorrect={false}
        
        onChangeText = {(text) => setWalkNotifications(text) }
        />

        <Text style={styles.textLable}>מספר שבב</Text>
        <TextInput  style={styles.textInput} 
        placeholder={props.animalData.ChipNumber}  
        label="ChipNumber"
        maxLength={5} 
        autoCorrect={false}
         
        onChangeText = {(text) => setChipNumber(text) }
        />

        <Text style={styles.textLable}>טיפול הבא</Text>
        <TextInput  style={styles.textInput} 
        placeholder={props.animalData.AppointmentData}  
        label="AppointmentData"
        maxLength={18} 
        autoCorrect={false}
        
        onChangeText = {(text) => setAppointment(text) }
        />
        <View style={styles.buttonContainer}>
          {/* <View style={styles.button}><Button color="#42A362"  title="הוסף" onPress={props.AddAnimalHandler} /></View> */}
          
          <Pressable onPress={props.onClose} style={[styles.button, {borderColor:'red', borderWidth: 1}]}><Text style={{ color:'green',fontWeight: 'bold',fontSize:18, padding:10}}  >סגור</Text></Pressable>
          <Pressable onPress={handleEdit} style={[styles.button, {borderColor:'green', borderWidth: 1}]}><Text style={{ color:'green',fontWeight: 'bold',fontSize:18, padding:10}}  >שינוי</Text>{changedLoader && <ActivityIndicator/>}</Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default AnimalEdit;

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
    width: '60%',
    flexDirection: 'row', 
    margin:14,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 6,
    elevation: 4,
    
  }
  ,
  textInput:{
    borderWidth: 1,
    borderColor: '#daeaf6',
    width: '90%',
    margin:10,
    padding: 18,
    backgroundColor:'#DFFFE9',
    borderRadius: 6
  },
  textLable: {
    width: '90%',
    fontWeight:'bold',
    fontSize: 16,
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
  image: {
    width:70,
    height: 70,
    borderRadius:70,
    
  },
})