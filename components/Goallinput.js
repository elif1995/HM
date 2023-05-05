import {StyleSheet, View ,Text , TextInput, Button, Modal, Alert, ToastAndroid, Pressable} from 'react-native'
import {useState} from 'react';

function GoalInput (props) {
  const[enteredGoalText, setEnteredGoalText] = useState('');
  const[enteredGoalNumber, setEnteredGoalNumber] = useState();

  const showAddedItemToast = () => {
    ToastAndroid.show('פריט נוסף לרשימה', ToastAndroid.LONG);
    
  };

  function goalTextInputHandler(enteredText){
    setEnteredGoalText(enteredText);
    
  }

  function goalNumberInputHandler(enteredNumber){
    setEnteredGoalNumber(enteredNumber)
  }

  function addGoalHandler(){

    if(enteredGoalNumber <= 0 || enteredGoalText.length <= 0){
      Alert.alert('שגיאה','אנא מלא את השדות הרייקים', [{
        text: 'הבנתי', style: 'destructive'
      }] )
    }else{
   
    props.onAddGoal(enteredGoalText, enteredGoalNumber);
    setEnteredGoalText('')
    setEnteredGoalNumber(null)
    showAddedItemToast()
  }
    
  }

  return(
    <View style={styles.inputContainer}>
    <TextInput
      value={enteredGoalText}
      style={styles.textInput}
      placeholder="המוצר שלך"
      onChangeText={goalTextInputHandler}
      maxLength={15}
      autoCapitalize="none"
      autoCorrect={false}
    />

    <TextInput
      value={enteredGoalNumber}
      style={styles.textInput}
      placeholder=" הכמות הרצויה"
      onChangeText={goalNumberInputHandler}
      maxLength={5}
      keyboardType="number-pad"
      autoCorrect={false}
    />

    <View style={styles.buttonContainer}>
      <View style={styles.buttonContainer}>
        <Pressable  style={[styles.button, {borderColor:'green', borderWidth: 1}]} onPress={addGoalHandler} ><Text style={{ color:'green',fontWeight: 'bold',fontSize:18, padding:10}} >הוסף</Text></Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable  style={[styles.button, {borderColor:'red', borderWidth: 1}]} onPress={props.onCancel} ><Text style={{color: 'red', fontWeight: 'bold', fontSize:18, padding:10}} >בטל</Text></Pressable>
      </View>
    </View>
  </View>
)
}

export default GoalInput

const styles = StyleSheet.create({
inputContainer: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
},
textInput: {
  borderWidth: 1,
  borderColor: '#daeaf6',
  width: '90%',
  margin: 6,
  padding: 10,
  backgroundColor: 'white',
  borderRadius: 6,
  fontSize: 16,
},
buttonContainer:{
  marginTop:2,
  flexDirection:"row",

},
image: {
  width: 100,
  height: 100,
  margin: 20,
},
button: {
  width: 100,
  margin: 8,
  backgroundColor:'white',
  borderRadius: 6,
  elevation: 4,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row'
},
})