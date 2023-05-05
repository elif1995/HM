import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { handleLogIn } from '../store/redux/LogInSlice';

import {View, Text, Button, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList} from 'react-native';

import {auth} from '../firebase'


export default function Login(props) {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    


    const handleLogin = () => {
      auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
       
        dispatch(handleLogIn({logInState: true}));
        
      })
      .catch(error => alert(error.message) )
    }


  
  return(
    <View style={styles.container}>
      
    
    <TextInput
      placeholder='אימייל'
      style={styles.answerInput}
      onChangeText={text => setEmail(text)}
      value={email}
      
    />
    <TextInput
          placeholder='סיסמא'
          style={styles.answerInput}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          
        />
    <TouchableOpacity
        style={styles.nextButton}
        onPress={handleLogin}
        
      >
        <Text style={styles.nextButtonText}>התחברות</Text>
    </TouchableOpacity>
    
  </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
    paddingHorizontal: 12,
    
  },
  
  answerInput: {
    
    height: 48,
    width: 300,
    borderColor: '#ddd',
    borderBottomWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 16,
    marginTop: 50,
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  nextButton: {
    width: 200,
    height: 55,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderColor: 'green',
    borderWidth: 4,
    elevation:3
  },
  nextButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});