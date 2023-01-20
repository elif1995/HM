import {View, StyleSheet, Image, Button, Text, Pressable, FlatList, StatusBar} from 'react-native';
import { useState, useEffect } from 'react';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import {MaterialIcons, Feather, MaterialCommunityIcons} from '@expo/vector-icons'

import GetImage from '../components/GetImage';


export default function ReceiptPicker() {
  const [image,setImage] = useState(null);
  const [imageList, setImageList] = useState([
    {imageUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/ReceiptSwiss.jpg/170px-ReceiptSwiss.jpg",
    currentTime: '06/11/2022'
  }])
  const [currentTime, setCurrentTime] = useState('')
 

  function deleteReceiptHandler(imageUri) {
    setImageList(currentReceipt => 
      {return currentReceipt.filter((receipt) => receipt.imageUri !==  imageUri)})
  }

  useEffect(()=> {
    const date = new Date().getDate()
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    

    setCurrentTime(
      date + '/' +  month + "/" + year  
    )

  },[])

  

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect:[4,3],
      quality: 1,
    })
    
    if(!result.cancelled){
      setImage(result.uri)
      setImageList([...imageList, {imageUri: result.uri, currentTime: currentTime}])
    }
  }
 
  const imagePreview = imageList.imageUri === null ? <Text> no receipt</Text> : 
      <FlatList  data={imageList} 
                  renderItem={({item}) => (
              <Pressable android_ripple={{color: 'grey'}} >
                <View style={styles.imageContainer}>
                  
                      <Image  source={{uri: item.imageUri}} style={styles.image}/>
                    
                  <View style={styles.DetailsContainer}>
                    <Text style={styles.textContainer}>נוסף בתאריך: {item.currentTime}</Text>
                    <Feather name="trash"  style={styles.deleteContainer} size={30} onPress={deleteReceiptHandler.bind(this, item.imageUri)}/> 
                  </View>
                </View>
                
              </Pressable>
              )}
          
          showsHorizontalScrollIndicator={true}
          bounces={false}
        />
  
  
  return(
    
    
    <View styles={styles.container}>
      
        <Button title="הוסף קבלה"  onPress={PickImage}/>
        {imagePreview}
    </View>
    
  )
}


const styles = StyleSheet.create({
  container:{
    
    backgroundColor: '#ffff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    
    
  },
  imageContainer:{
    marginHorizontal:30,
    marginVertical:20,
    borderColor: 'lightgrey',
    
    borderRadius:15,
    overflow: 'hidden',
    elevation: 7,
    
  },
  DetailsContainer:{
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    
  },
  textContainer:{
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding:10,
    // backgroundColor: '#D5f3fe',
    color: '#3c99dc',
    margin:2
  },
  deleteContainer:{
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding:5,
    backgroundColor: '#fff',
    color: '#FF6863',
    width: '20%',
    justifyContent: 'center',
    alignSelf: 'center',
    
    margin:3
  },
  image: {
    width:"100%",
    height: 250,
  
    
  }
})