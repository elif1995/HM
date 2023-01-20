import { applyMiddleware } from '@reduxjs/toolkit';
import {useState} from 'react'
import { StyleSheet, Text, View ,Pressable,FlatList, ToastAndroid, Alert} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import NewAnimalInput from '../components/NewAnimalInput.js';
import NewAnimalItem from '../components/NewAnimalItem.js';
import {addAnimals, removeAnimals} from '../store/redux/AnimalsSlice'
import {  MaterialIcons } from '@expo/vector-icons';


function Animals ( ) {
  //geting data about the animals from the redux slice 
  const Animals = useSelector((state) => state.animals);

  
  const dispatch = useDispatch()

  //modal handler for adding modal
  const[addModalHandler, setAddModalHandler] = useState(false);
  const[addedAnimalLoader, setAddedAnimalLoader] = useState(false)
  const[cancelModal, setCancelModal] = useState(false)
  const[addAnimalData, setAddAnimalData] = useState({
    Image:'',
    Name: '',
    Age: 0,
    WalkNotifications:'',
    ChipNumber: '',
    AppointmentData: '',
  })

  const showAddedItemToast = (props) => {
    ToastAndroid.show('בעל חיים נוסף לרשימה', ToastAndroid.TOP);
  };

  function handleOnChange (text, input) {
    setAddAnimalData(prevState => ({...prevState, [input]:text }));
    
  }


  //function called when pressed add to add the animal and its details
  function AddAnimalHandler(){
    
    

    if(addAnimalData.Age > 0 && addAnimalData.Name !== '')
      {setAddedAnimalLoader(true)
    
      
   setTimeout(() => {
      //call funtion to close modal after adding 
      setAddModalHandler(false)
    
    
    
    //call dispatch function to send the data to redux slice
    
    setAddedAnimalLoader(false)
    dispatch(addAnimals(addAnimalData))
    showAddedItemToast()

    //reseting the states 
    setAddAnimalData(
      {
        Image:'',
        Name: '',
        Age: 0,
        WalkNotifications:'',
        ChipNumber: '',
        AppointmentData: '',
      }
    )
   },1500)}
   else{
    Alert.alert('חסר מידע',' חסר גיל הבעל חיים או שם',[{text:'הבנתי', style: 'destructive'}])
   }
      
    
  }

  //opens the modal for adding an animal
  function startAddAnimalHandler () {
    setAddModalHandler(true)
  }

  //closing modal
  function onCloseModal () {
    
    setAddModalHandler(false)
  }

  //function which gets the animal pressed to delete name
  function deleteAnimalHandler(Name) {
    dispatch(removeAnimals({Name: Name}))
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.noItems}>
        <Pressable >
          <View >
            <Pressable onPress={startAddAnimalHandler} style={styles.noItemsButton}   ><Text  style={{color: '#3c99dc',fontWeight: 'bold', fontSize: 20}}>הוסף בעל חיים  </Text><MaterialIcons name="pets" size={30} color="green" /></Pressable>
            <NewAnimalInput Loader={addedAnimalLoader}  visible={addModalHandler} onClose={onCloseModal} handleOnChange={handleOnChange} AddAnimalHandler={AddAnimalHandler}/>
          </View>
        </Pressable>
      <View style={styles.animalsList}>
        <FlatList data={Animals.allAnimals} renderItem={
          (item) =>{
             return <NewAnimalItem onDeleteItem={deleteAnimalHandler}  Data={item.item}/>
             
            }
        } 

        showsVerticalScrollIndicator={false}
        >
          </FlatList>
      </View>
      </View>
    </View>
  );
}

export default Animals

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  noItems:{
    alignItems: 'center',
    marginTop: 15,
    
    height: '50%',
    
  },
  noItemsButton:{
    flexDirection: 'row',
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    backgroundColor: "#fff",
    borderRadius:15,
    
    elevation: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  animalsList:{
    marginTop:25,
    height: 580,
    width: '100%',
  }
  
})