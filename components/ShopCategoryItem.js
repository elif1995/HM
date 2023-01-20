import {StyleSheet, View, Text, Button, Pressable} from 'react-native';

function ShopCategoryItem ({item}) {


  return (
    <Pressable 
        android_ripple={{color: 'grey'}} 
        style = {({pressed }) => pressed && styles.pressedItem}
        
      >
      <View style={styles.container}>
        
          <View >
            <Text style={styles.category} >{item.name}</Text>
          
          </View>
      </View>
    </Pressable>
  )
}

export default  ShopCategoryItem

const styles = StyleSheet.create({
  container: {
    margin: 5,
    
   
    
    
    
    
  },
  category: {
    
    width: 100,
    color: '#3c99dc',
    borderColor:'lightgreen',
    fontWeight: 'bold',
    elevation: 4,
    fontSize:20,
    backgroundColor:'white',
    padding: 5,
    borderRadius:2,

    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  pressedItem:{
    color:'lightgrey',
  }
})