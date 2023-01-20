import { useState } from 'react';

import {View, Text, StyleSheet, Image, Pressable} from 'react-native'
import {Entypo, Feather} from '@expo/vector-icons';
import AnimalEdit from './AnimalEdit.js'


function NewAnimalItem (props) {

  const [visible, setVisible] = useState(false)

  
  
  const handleCloseModal = () => {
    setVisible(false)
  }

  const handleOpenModal = () => {
    setVisible(true)
  }

  
  return(
    <View style={styles.container}>
            <Text style={styles.trashContainer}  onPress={props.onDeleteItem.bind(this, props.Data.Image)}><Feather name="trash" color="white" size={25}/></Text>
      <View style={styles.imageContainer}>
        <Pressable style={styles.detailsButton}>
            <Entypo name="dots-three-vertical" size={28}  onPress={handleOpenModal} />
            <AnimalEdit visible={visible} animalData={props.Data} onClose={handleCloseModal}/>
          
        </Pressable>
        <Text style={styles.goalText}>{props.Data.Name}</Text>
        {props.Data.Image ? <Image source={{uri: props.Data.Image}} style={styles.image} /> 
        : <Image source={{uri: "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"}} style={styles.image} />}
      </View>
    </View>
  )
}

export default NewAnimalItem

const styles = StyleSheet.create({
  
  imageContainer:{
    backgroundColor: 'white',
    marginHorizontal:30,
    marginBottom:15,
    borderColor: 'lightgrey',
    overflow: 'hidden',
    elevation: 4,
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    padding: 30,
    borderRadius: 10,
    borderTopLeftRadius:0,
    alignItems: 'center',
    
  },
  trashContainer:{
    elevation: 6,
    marginHorizontal:30,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6863',
    width: '12%',
    padding: 5
  },
  goalText:{
    color: 'black',
    padding: 12,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  image: {
    width:70,
    height: 70,
    borderRadius:70,
  },
  detailsButton:{
    flex:1,
    
  }
})