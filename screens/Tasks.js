import { useState } from "react";
import { StyleSheet, Text, View ,Pressable,FlatList, ToastAndroid, Alert} from "react-native";
import NewTaskInput from '../components/NewTaskInput'
import NewTaskItem from '../components/NewTaskItem'
import {useSelector} from 'react-redux';
import ConfettiCannon from 'react-native-confetti-cannon';
import {  MaterialIcons } from '@expo/vector-icons';


function Tasks() {
  const Tasks = useSelector((state) => state.tasks.allTasks)

  const [tasksModal, setTasksModal] = useState(false);
  const [shoot,setShoot] = useState(false);


  function handleOpenTasksModal(){
    setTasksModal(!tasksModal)
  }

  return(
    <View  style={styles.noItems} >

        <View>
        <Pressable onPress={handleOpenTasksModal}  style={styles.noItemsButton}><Text style={{color: '#3c99dc',fontWeight: 'bold', fontSize: 20}}> הוסף מטלה  </Text><MaterialIcons name='assignment' size={30} color='green' /></Pressable>
        <NewTaskInput visible={tasksModal} onClose={handleOpenTasksModal} />
      </View>
      <View style={styles.tasksList}>

        <FlatList data={Tasks} keyExtractor={item => item.id} renderItem={
          (item) =>
          (<NewTaskItem setShoot={setShoot} Data={item.item}/>)
          
          
        } 

        showsVerticalScrollIndicator={false}
        >
          </FlatList>
          
      </View>
        <View>
          {shoot && <ConfettiCannon explosionSpeed={300}  style={{flex: 1, width: 100}}count={300} origin={{x: -200, y: 100}} />}
        </View>
    </View>
  )
}

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
  noItems:{
    alignItems: 'center',
    marginTop: 15,
    
    height: 80,
    
  },
  noItemsButton:{
    width: 300,
    flexDirection: 'row',
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
    marginBottom:10,
    
  },
  tasksList:{
    
    
    height: 600,
  }
  
  ,})