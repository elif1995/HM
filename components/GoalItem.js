import {StyleSheet, View, Text, Pressable, Vibration} from 'react-native';
import {useEffect, useState} from 'react';
import {MaterialIcons, Feather, MaterialCommunityIcons} from '@expo/vector-icons'

function GoalItem(props) {

  const ONE_SECOND_IN_MS = 1000;



  const [isChecked, setIsChecked] = useState(false);

  function handleChecked() {
    setIsChecked(!isChecked)
    Vibration.vibrate(0.1 * ONE_SECOND_IN_MS)
  }

  function handleStyle () {
    if(isChecked) {
       return styles.goalItemChecked
    }else{
      return styles.goalItem
    }
  }

 
  return (
     
        <View style={styles.goalItemContainer}>            
        <View style={handleStyle()} >

            <Text style={styles.goalNumber}>{props.number}</Text>
            <Text style={styles.goalText}>{props.text}</Text>
            
            <Pressable  
              android_ripple={{color: 'grey'}} 
              style = {({pressed }) => pressed && styles.pressedItem}

            >
              <View style={styles.pressedItem}>
                <Text style={styles.goalDelete}  onPress={props.onDeleteItem.bind(this, props.id)}><Feather name="delete" size={20}/></Text>
              </View>
            </Pressable>
        </View>
                {!isChecked ? <Text style={styles.goalOk}  onPress={handleChecked}><MaterialIcons name="add-task" size={24} color='green'/></Text> : <Text style={styles.goalCancel}  onPress={handleChecked}><MaterialCommunityIcons color='red' name="cancel" size={24} /></Text>}
        </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItemContainer:{
    padding:2,
    backgroundColor: 'white',
    flexDirection:'row-reverse',
    alignItems: 'center',
   
  },
  goalItem:{
    flex:1,
    marginRight:-5,
    margin:5,
    padding:8,
    borderRadius:6,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection:'row-reverse',
    elevation: 6,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  goalItemChecked:{
    flex:1,
    marginRight:-5,
    padding:8,
    borderRadius:6,
    backgroundColor: 'lightgreen',
    justifyContent: 'space-between',
    margin:5,
    flexDirection:'row-reverse',
    elevation: 6,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  pressedItem:{
    flex: 1,
    flexDirection:'row',
    opacity: 0.7,
    
  },
  goalText:{
    color: 'black',
    padding: 12,
    fontWeight: 'bold'
    
  },
  goalDelete:{
    
    color: 'red',
    padding: 12,
    fontWeight: 'bold',
    
  },
  goalCancel:{
    backgroundColor: 'white',
    color: 'red',
    padding: 10,
    fontWeight: 'bold',
    elevation: 5,
    shadowColor: 'ligthgrey',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 1,
    shadowOpacity: 0.15,
    borderRadius:5,
  },
  goalOk:{
   backgroundColor:'lightgreen',
    color: 'black',
    padding: 10,
    fontWeight: 'bold',
    elevation: 5,
    shadowColor: 'ligthgrey',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 1,
    shadowOpacity: 0.15,
    borderRadius:5,
    
  },
  goalNumber:{
    color: 'white',
    padding: 12,
    backgroundColor: 'green',
    borderRadius:6,
    fontWeight: 'bold',
    
  }
})