import {View, Text, Modal, TouchableOpacity, StyleSheet, TextInput,} from 'react-native';

var color;
export default function KidsEvents(data){

  color = data.data.color
  
  
  return(
    <View style={[styles.container,{backgroundColor:color}]}>
      <Text >{data.data.selectedDay}</Text>
      <View style={styles.dayContainer}>
        
        <Text>{data.data.selectedHour}</Text>
        <Text>{data.data.description}</Text>
      </View>
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    padding:10,
    margin: 15,
    borderRadius: 15,
    
  },
  dayContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    borderRadius: 15,
    margin: 15,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  }
})