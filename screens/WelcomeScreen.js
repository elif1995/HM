import { useState,useCallback, useMemo, useRef } from 'react';
import {View, Text, Button, TextInput, StyleSheet, FlatList, Pressable} from 'react-native';
import SignUp from '../components/SignUp';
import { useSelector, useDispatch} from 'react-redux'
import { handleLogIn } from '../store/redux/LogInSlice';
import Login from '../components/Login';
import BottomSheet from '@gorhom/bottom-sheet';

export default function WelcomeScreen({navigation}) {

  

  const [enterSignUp, setEnterSignUp] = useState(false)

  const [bottomSheet, setBottomSheet] = useState(false)
  const[modalProductsIsVisible, setModalProductsIsVisible] = useState(false)
  
  
  // ref
  const bottomSheetRef = useRef(null);

  
  // variables
  const snapPoints = useMemo(() => ['1%', '80%'], []);

  // callbacks
  const handleSheetChanges = () => {
    
    
    

  }

  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const dispatch = useDispatch()

  const logIn = useSelector((state) => state.LogIn);
  
  const handleSignup = () => {
    setEnterSignUp(true);
  };

  const handleSignin = () => {
    // dispatch(handleLogIn({logInState: true}));

  };


  function onCancel() {
    bottomSheetRef.current?.close();
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,margin:0}}>
      
      {enterSignUp ? <SignUp setEnterSignUp={setEnterSignUp}/> : 
      <View >
        <Text style={{ fontSize: 32, marginBottom: 50, fontWeight: 'bold' }}>ברוך הבא ל-homzy💡</Text>
        <Pressable title="Sign in" onPress={handleExpandPress} >
          <Text style={styles.menuButtonsText}>להתחבר</Text>
        </Pressable>
        <Pressable  onPress={handleSignup}>
          <Text style={styles.menuButtonsText}>להרשם</Text>
        </Pressable>
      </View> }
      <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onClose={() => setBottomSheet(false)}
      style={styles.styleBottomSheet}
      
    >
    <View style={styles.contentContainer} >
      <Login />
    </View>
    </BottomSheet>
    </View>
  );
    
  
}

const styles = StyleSheet.create({
  menuButtonsText: {
    padding:20,
    backgroundColor: "#fff",
    borderRadius:15,
    borderColor: 'lightgreen',
    borderWidth: 2,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
    elevation: 8,
    shadowColor: 'grey',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    marginTop:20,
    
  },
  styleBottomSheet:{
    backgroundColor: 'white',
    elevation: 55 ,
    
    borderRadius: 50,
    
    
    
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    
    zIndex:2
  },
})