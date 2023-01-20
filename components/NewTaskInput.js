import {ActivityIndicator, StyleSheet, View, TextInput,  Modal, Text, Alert, Pressable} from 'react-native'
import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { addTasks } from '../store/redux/TasksSlice';
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import uuid from 'react-native-uuid';

function NewTaskInput (props) {

  const dispatch = useDispatch()

  
  const[Loader, setLoader] = useState(false)
  const[deadline, setDeadline] = useState('')
  const[description, setDescription] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  
 
  

  const[date, setDate] = useState(new Date());
  const[mode, setMode] = useState('date')
  const[show, setShow] = useState(false)
  const[text, setText] = useState('Empty')
  

  const taskType = [
      {value:'ניקיון'},
      { value:'קניות'},
      { value:'אוכל'},
      { value:'כביסה'},
      { value:'כללי'},
  ]

  const profileForTask = [
      { value:'קארין'},
      { value:'אלי'},
      { value:'ישראל'},
      { value:'ישראלה'},
      { value:'כולם'},
  ]

  function handleClose(){
    props.onClose()
    setSelectedUsers([])
    setSelectedTask('')
    setDeadline('')
    setDescription('')
    
  }


  function AddTaskHandler(){

    if(selectedTask !== "" && description !== ''){

    const task = {
      id: uuid.v4(),
      description: description,
      selectedUsers: selectedUsers,
      selectedTask: selectedTask,
      deadline: deadline,
    }

    setLoader(true)

    setTimeout(() => {
      setLoader(false)
      dispatch(addTasks(task))
      setSelectedUsers([])
      setSelectedTask('')
      setDeadline('')
      setDescription('')
      props.onClose()
    },1000)
  }else{
    Alert.alert('שגיאה','חסר סוג מטלה או תיאור מטלה',[{text:'הבנתי', style: 'destructive'}])
  }
    
    
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate  ;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate) 
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = +  tempDate.getHours() + ' : ' + tempDate.getMinutes() ;
    
    setDeadline(fDate + ' (' + fTime + ')')
    
    
    
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode)
  }




  return(
    <Modal visible={props.visible} animationType='slide'>
      
      
      <View style={styles.inputContainer}>
    
        
      <SelectList 
        
        setSelected={(val) => setSelectedTask(val)} 
        data={taskType} 
        save="task type"
        placeholder='סוג משימה'
        boxStyles={{borderRadius:5, width:280, marginBottom: 20, borderColor:'green'}}
      />

      <MultipleSelectList 
        label="משתמשים משויכים"
        setSelected={(val) => setSelectedUsers(val)} 
        data={profileForTask} 
        save="task type"
        placeholder='שיוך משימה'
        boxStyles={{borderRadius:5, width:280, marginBottom: 20, borderColor:'green'}}
        search={false}
        
      />


          <TextInput  style={styles.textInput} 
          placeholder="תיאור המטלה" 
          onChangeText={text => setDescription(text)} 
          label="description"
          maxLength={100} 
          multiline={true}
          numberOfLines={3}
          autoCorrect={false}
          />

          <View style={{flexDirection: 'row'}}>
            <View  style={[styles.button, {borderColor:'green', borderWidth: 1}]}>
              <Text style={{ color:'green',fontWeight: 'bold',fontSize:12, padding:5}}  onPress={() => showMode("date")} >הוסף תאריך לסוף המטלה</Text>
            </View>
            <View style={[styles.button, {borderColor:'green', borderWidth: 1}]}>
              <Text style={{ color:'green',fontWeight: 'bold',fontSize:12, padding:5}}   onPress={() => showMode("time")} >הוסף שעה לסוף המטלה</Text>
            </View>
          </View>

          {deadline ? <Text style={[styles.textInput, {textAlign:'center', backgroundColor:'lightgreen',elevation:2}]} >{deadline}</Text>  : <Text style={[styles.textInput, {textAlign:'center', backgroundColor:'lightgrey',elevation:2}]} ></Text>}

          {show && <DateTimePicker testID='dateTimePicker' display="default" value={date} mode={mode} is24Hour={true} onChange={onChange}/>}

          <View style={styles.buttonContainer}>
            <Pressable onPress={AddTaskHandler} style={[styles.button, {borderColor:'green', borderWidth: 1}]}><Text style={{ color:'green',fontWeight: 'bold',fontSize:18, padding:10}}   >הוסף </Text>{Loader === true && <ActivityIndicator />}</Pressable>
            
            <Pressable onPress={handleClose} style={[styles.button, {borderColor:'red', borderWidth: 1}]} ><Text style={{color: 'red', fontWeight: 'bold', fontSize:18, padding:10}}   >בטל</Text></Pressable>
            
          </View>
    
      </View>
    </Modal>
  )
}

export default NewTaskInput


const styles = StyleSheet.create({
  inputContainer:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin:6,
    padding: 16
  },
  textInput:{
    borderBottomWidth: 1,
    width: '90%',
    textAlign: 'right',
    margin:12,
    padding: 12,
    backgroundColor:'white',
    borderRadius: 6,
    fontSize:20,
  },
  buttonContainer:{
    marginTop:1,
    flexDirection:"row",

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