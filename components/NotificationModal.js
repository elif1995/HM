import { useState } from 'react';
import {View, Text, StyleSheet, Pressable, Modal, FlatList} from 'react-native';
import { useSelector } from 'react-redux';
import Tasks from './../screens/Tasks';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';


function NotificationModal(props){
  const Notification = useSelector((state) => state.tasks.allTasks)

  

  return(
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center', padding:15}}>
          <Text style={{fontSize:30}}>התראות</Text>
          <MaterialIcons onPress={props.onClose} name='close' size={40}/>
        </View>
      <FlatList 
      data={Notification} 

      
      
     
      renderItem={({item, index}) =>
        ( 
        <Pressable>
          <View style={[styles.notificationsItem, {backgroundColor: index % 2 === 0 ?  '#F1FFF6' : '#EAFFF1'}]}>
            
            <Text style={{fontWeight: 'bold',fontSize:24}} >{item.selectedTask}</Text>
            <Text style={{fontSize:18}}>{item.description}</Text>
          </View>
        </Pressable>)
      }
      
      />
      </View>
    </Modal>
  )

}

export default NotificationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:600
  },
  notificationsItem:{
    backgroundColor: '#DBE8F9',
    width:'100%',
    flexDirection: 'column',
    padding:15,
    borderTopWidth: 0.5,
    borderColor: 'lightgrey'
  }
})