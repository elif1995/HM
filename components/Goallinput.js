import {StyleSheet, View, TextInput, Button, Modal, Alert, ToastAndroid} from 'react-native'
import {useState} from 'react'

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
    <Modal visible={props.visible} animationType='slide'>
    <View style={styles.inputContainer}>
        {/* <Image style={styles.image} source={require('../assets/favicon.png')}/> */}
        <TextInput value={enteredGoalText} style={styles.textInput} 
        placeholder="המוצר שלך" 
        onChangeText={goalTextInputHandler} 
        maxLength={15} 
        />

        <TextInput value={enteredGoalNumber} style={styles.textInput} 
        placeholder=" הכמות הרצויה" 
        onChangeText={goalNumberInputHandler} 
        maxLength={5} 
        keyboardType='number-pad'
        
        autoCorrect={false}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}><Button color="#42A362"  title="הוסף" onPress={addGoalHandler}/></View>
          <View style={styles.button}><Button color="#f31282" title="בטל" onPress={props.onCancel}/></View>
          
        </View>
      </View>
    </Modal>
  )
}

export default GoalInput

const styles = StyleSheet.create({
  inputContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
    padding: 16
  },
  textInput:{
    borderWidth: 1,
    borderColor: '#daeaf6',
    width: '90%',
    margin:6,
    padding: 8,
    backgroundColor:'#DFFFE9',
    borderRadius: 6
  },
  buttonContainer:{
    marginTop:16,
    flexDirection:"row",

  },
  button: {
    width: 100,
    margin: 8
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  }
})