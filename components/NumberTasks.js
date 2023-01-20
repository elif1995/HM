import { useState } from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native'
import {useSelector} from 'react-redux';
import {  MaterialIcons} from '@expo/vector-icons';
import NotificationModal from './NotificationModal.js';



function NumberTasks () {
  const [openNotification, setOpenNotification] = useState(false)

  const Tasks = useSelector((state) => state.tasks.allTasks)

  function handleOpenModal(){
    setOpenNotification(!openNotification)
  }

  return(
    <Pressable onPress={handleOpenModal}   style={styles.container}>
      
      <View style={{ backgroundColor:'white',borderWidth:1, width:28, height:28 ,borderRadius: 25,}}>
        <MaterialIcons  size={26} name='notifications-none' />
        <View style={styles.NumberTasks}><Text style={{ color: 'white' }}>{Tasks.length}</Text></View>
      </View>
      <NotificationModal visible={openNotification} onClose={handleOpenModal}/>
    </Pressable>
  )
}

export default NumberTasks

const styles = StyleSheet.create({
  container: {
    
    height: 30,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  NumberTasks: {
    backgroundColor:'red',
    
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    marginLeft:-10,
    width:18,
    height: 18 ,
   
  }
})