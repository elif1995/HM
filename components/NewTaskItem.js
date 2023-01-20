import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTasks } from '../store/redux/TasksSlice'
import {View, Text, StyleSheet, Image, Pressable} from 'react-native'
import {Entypo, Feather} from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';


function NewTaskItem(props){

  const dispatch = useDispatch()

  function handleDelete(){
    dispatch(removeTasks(props.Data.id))
    props.setShoot(true)


    setTimeout(() => 
    {
      props.setShoot(false)
    }
    ,3000)
  }


  return(
    <View style={styles.container}>
      <View style={styles.taskContainer} >
        <Text style={styles.taskType}>{props.Data.selectedTask}</Text>
        
        <View style={styles.taskDeadline}>
          <Text style={styles.text}>לביצוע עד:</Text>
          <Text >{props.Data.deadline} </Text>
        </View>
        <View style={styles.taskTo}>
          <Text style={styles.text}>משויך ל-</Text>
          {props.Data.selectedUsers.map((user) =><Text style={styles.usersToDo} >{user}</Text> )}

        </View>

        <Text style={styles.description}>{props.Data.description}</Text>
        <Text style={styles.taskFinished} onPress={handleDelete}  >מטלה הושלמה</Text>
      
    </View>
      
    </View>
  );
}

export default NewTaskItem;


const styles = StyleSheet.create({
  container: {
    
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  taskContainer:{
    flex: 0.8,
    width: '85%',
    backgroundColor: 'white',
    
    margin:5,
    borderColor: 'lightgrey',
    
    elevation: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 6,
    
    alignItems:'flex-start',
    
  },
  taskType: {
    backgroundColor: 'green',
    color: 'white',
    padding: 8,
    borderRadius: 5,
    marginTop: -55,
    elevation: 4,
    fontWeight: 'bold'
    
  },
  taskDeadline:{
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: "100%",
    marginTop:10
  },
  taskTo:{
    flexDirection: 'row', 
     
    width: "100%",
    marginTop:5,
    alignItems: 'center',
  },
  text:{ 
    fontWeight: 'bold',
    fontSize:16,
  },
  usersToDo:{
    backgroundColor: 'lightgrey',
    borderRadius: 26,
    padding:5,
    marginHorizontal:5
  },
  description:{
    padding:5,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginTop:10,
    height: '50%',
    fontSize:20
  },
  taskFinished:{
    backgroundColor: 'green',
    color: 'white',
    padding: 8,
    borderRadius: 5,
    marginTop:10,
    elevation: 4,
    fontWeight: 'bold'
  }
})