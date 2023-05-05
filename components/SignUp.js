import React, { useState, useRef, useEffect } from 'react';
import {useSelector} from 'react-redux'
import {View, Text, Button, TextInput, StyleSheet, Animated, TouchableOpacity, FlatList} from 'react-native';

import {auth} from '../firebase'
import {  MaterialIcons} from '@expo/vector-icons';

export default function SignUp(props) {
 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [formData, setFormData] = useState({});
  // const [answer, setAnswer] = useState('');

  // const animatedValue = useRef(new Animated.Value(0)).current;

  // const questions = [
  //   { text: 'היי אשמח להכיר, מה שמך? 👋', key: 'name' },
  //   { text: '  אשמח לדעת את האיימיל שלך כדי שנוכל לעדכן אותך בדברים חשובים 😎 ' , key: 'email' },
  //   { text: 'אבקש ממך ליצור סיסמא חזקה 🧐', key: 'password' },
  //   { text: 'אבקש ממך לחזור על הסיסמא 🙈 ', key: 'password' },
  //   { text: 'יופי עוד קצת וסיימנו 🥳 ', key: 'text' },
  //   // Add more questions here
  // ];

  const handleSignup = () => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
     
      props.setEnterSignUp(false)
    })
    .catch(error => alert(error.message) )
  }

  // useEffect(() => {
  //   Animated.timing(animatedValue, {
  //     toValue: 1,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     animatedValue.setValue(0);
  //   });
  // }, [currentQuestionIndex]);

  const handleBackToWelcome = () => {
    props.setEnterSignUp(false)
  }

  // const handleAnswer = (answer) => {
  //   setAnswer(answer);
  // };


  // const handleNextQuestion = (answer) => {
  //   const currentQuestion = questions[currentQuestionIndex];
  //   if (currentQuestion) {
  //     setFormData({ ...formData, [currentQuestion.key]: answer });
  //     setAnswer('');
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   }
  // };

  // const currentQuestion = questions[currentQuestionIndex];
  // const lastQuestionIndex = questions.length - 1;


  

  return (
    
    <View style={styles.container}>
      
      {/* <View style={styles.circle}>
        <Animated.Text style={[styles.index, { transform: [{ rotateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }]}>
          {currentQuestionIndex + 1}  מתוך  {questions.length}
        </Animated.Text>
      </View> */}
    
      {/* <Text style={styles.question}>
        {currentQuestion.text}
      </Text>
     */}
    <TextInput
      placeholder='אימייל'
      style={styles.answerInput}
      onChangeText={text => setEmail(text)}
      value={email}
      leftIcon={<MaterialIcons
        name='face'
        size={16}
      />}
    />
    <TextInput
          placeholder='סיסמא'
          style={styles.answerInput}
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          leftIcon={<MaterialIcons
            name='lock-outline'
            size={16}
          />}
        />
    <TouchableOpacity
        style={styles.nextButton}
        onPress={handleSignup}
        
      >
        <Text style={styles.nextButtonText}>הרשמה</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.nextButton, {borderColor: 'red', backgroundColor: 'pink'}]} onPress={handleBackToWelcome}>
      <Text style={styles.nextButtonText}>יציאה</Text>
    </TouchableOpacity>
  </View>
  
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  circle: {
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'lightgreen',
    borderWidth:1,
    marginBottom:15
  },
  index: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#414141',
    textAlign: 'center',
    marginBottom: 20,
  },
  answerInput: {
    
    height: 48,
    width: 300,
    borderColor: '#ddd',
    borderBottomWidth: 2,
    borderRadius: 6,
    paddingHorizontal: 16,
    marginBottom: 20,
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