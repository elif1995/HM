import {useSelector, useDispatch} from 'react-redux'
import {View, Text, Button, StyleSheet, FlatList, Pressable} from 'react-native';
import {ShopingContext} from '../store/context/Shoping-context.js';
import HomeReviewsBox from '../components/HomeReviewsBox.js'
import { ShopingCartSlice } from './../store/redux/ShopingCartSlice';
import { handleLogOut, LoginSlice } from './../store/redux/LogInSlice';
import WelcomeScreen from './WelcomeScreen.js';
import { Feather ,EvilIcons, Ionicons, MaterialIcons} from '@expo/vector-icons'; 


export default function HomeScreen({navigation}) {
  const Animals = useSelector((state) => state.animals);
  const products = useSelector((state) => state.shoppingCart);
  const logInState = useSelector((state) => state.Login.logInState);

  const dispatch = useDispatch()
  

  function handleOpenMenu(){
    navigation.toggleDrawer();
  }

  function handleMoveto(where){
    navigation.navigate(where);
  }
  
  
  return(
    <View style={styles.container}>
        {logInState ? (<View><View style={styles.reviewContent}>
          <Feather style={{ marginLeft: -90 }}  name='log-out'  size={25} onPress={() => dispatch(handleLogOut(false))} />

    <Pressable android_ripple={{color: 'grey'}} onPress={() => handleMoveto('רשימת קניות')}>
      <Text style={styles.reviewLink} >עוד קניות..</Text>
    </Pressable>
    {products.allProducts.length > 0 ? <FlatList data={products.allProducts} renderItem={
      
      (itemData) => {
        return(
        <HomeReviewsBox text={itemData.item.text} number={itemData.item.number} /> )
      }}
      inverted={true}
      initialNumToRender={2}
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
    /> : <View styles={styles.empty}>
          <Text style={styles.emptyBox}>הרשימה ריקה</Text>
        </View>}
  </View>
  <View style={styles.reviewContent}>
    <Pressable android_ripple={{color: 'grey'}} onPress={() => handleMoveto('בעלי חיים')}>
      <Text style={styles.reviewLink} >עוד בבעלי חיים..</Text>
    </Pressable>
    {Animals.allAnimals.length > 0 ? <FlatList data={Animals.allAnimals} renderItem={
      
      (itemData) => {
        return(
        <HomeReviewsBox text={itemData.item.Name} image={itemData.item.Image} /> )
      }}
      inverted={true}
      initialNumToRender={2}
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
    /> : <View styles={styles.empty}>
          <Text style={styles.emptyBox}>הרשימה ריקה</Text>
        </View>}
  </View></View>) : (<WelcomeScreen/>) }

      {/* <Text>בקרוב ....</Text>
      <Button title="פתח תפריט" onPress={handleOpenMenu}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  reviewContent:{
    
    width: '100%',
    flex: 0.4,
    justifyContent: 'flex-start',
    
    
  },
  reviewLink:{
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
    textDecoration:'underline',
    height: 20,
    margin:15,
  },
  
  empty:{
    justifyContent: 'center', 
    alignItems: 'center',
    
    
  },
  emptyBox:{
    
    padding:50,
    backgroundColor: "#fff",
    borderRadius:20,
    color: '#3c99dc',
    fontWeight: 'bold',
    fontSize: 20,
    elevation: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    textAlign: 'center',
    
  }
})