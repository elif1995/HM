import {View, Button, Modal, StyleSheet, Image, Vibration} from 'react-native';
import { launchCameraAsync } from 'expo-image-picker';
import {useState} from 'react'

function GetImage  ({ setImagePicked}) {
  

  // async function takeImageHandler(){
  //   const image = await launchCameraAsync({
      
  //     allowsEditing:false,
  //     aspect:[16, 9],
  //     quality: 1,
  //   });
  //   setImagePicked(image.uri) 
    
  // }


  return (
    <View>
       {/* <Button title="הוסף קבלה" onPress={takeImageHandler}/>
        */}
       
       
    </View>
  )
}

export default GetImage


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16
  },
  imagePreview: {
    flex: 1,
    width:'100%',
    height: 200,
    
  },
  image: {
    flex: 0.5,
    width: '100%',
    height: '100%',
  }
})