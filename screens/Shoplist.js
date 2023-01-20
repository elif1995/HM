

import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { StyleSheet,  View , FlatList, Text, Pressable} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { Fontisto, MaterialIcons } from '@expo/vector-icons'; 

import GoalItem from '../components/GoalItem';
import GoalInput from '../components/Goallinput';
import ShopCategoryItem from '../components/ShopCategoryItem';

import { addProduct, removeProduct } from '../store/redux/ShopingCartSlice';


const shopCategories = [{
  name: 'אוכל'
},{
  name: 'פארמה'
}
,{
  name: 'ריהוט'
},{
  name: 'שונות'
}
,{
  name: 'בעלי חיים'
}
,{
  name: 'הוסף...'
}
]

export default function App({navigation}) {


  
  const dispatch = useDispatch()

  const products = useSelector((state) => state.shoppingCart)

  console.log(products)
  
  const[modalProductsIsVisible, setModalProductsIsVisible] = useState(false)
  

  function addGoalHandler(enteredGoalText, enteredGoalNumber){
    
    dispatch(addProduct({text: enteredGoalText,number:  enteredGoalNumber}))
    setModalProductsIsVisible(false)
    
  }

  function deleteGoalHandler(id) {
    dispatch(removeProduct(id))
  }

  function startAddItemHandler () {
    setModalProductsIsVisible(true)
  }

 
  
  function endAddItemHandler() {
    setModalProductsIsVisible(false)
  }

  function receiptHandler () {
    navigation.navigate('קבלות');
  }

  
  
return(
<>
    <StatusBar style='dark'/>
    <View style={styles.container}>
      <View >
        <FlatList  data={shopCategories} 
            renderItem={({item}) =>  <ShopCategoryItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />

      </View>

      <View style={styles.goalAddButton} >
        <Fontisto name='shopping-basket-add' color='green' size={34} onPress={startAddItemHandler}/>
        
        <MaterialIcons name="receipt-long" size={40} onPress={receiptHandler}/>
      </View>
     <GoalInput visible={modalProductsIsVisible}  onAddGoal={addGoalHandler} onCancel={endAddItemHandler}/>
      <View style={styles.goalsContainer}>
      {products.allProducts.length > 0 ? <FlatList data={products.allProducts} renderItem={
        (itemData) => {

          return <GoalItem text={itemData.item.text} number={itemData.item.number} id={itemData.item.id} onDeleteItem={deleteGoalHandler}/>; 
        }}
         
      />: <View style={styles.noItems}><Pressable onPress={startAddItemHandler} ><View ><Text style={styles.noItemsButton}  >הוסף מוצרים לרשימה +</Text></View></Pressable></View>}
         
      
      </View>
      
    </View>
    </>)
    
  
  }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop:20,
        paddingHorizontal: 10,
        backgroundColor: "#fff"
      },
      
      goalsContainer:{
        flex: 5,
        
      },
      goalAddButton: {
        padding:10,
        
        justifyContent: 'space-between',
        flexDirection: 'row'
      },
      noItems:{
        justifyContent: 'center', 
        alignItems: 'center',
        height: '50%',
        
      },
      noItemsButton:{
        padding:20,
        backgroundColor: "#fff",
        borderRadius:5,
        color: '#3c99dc',
        fontWeight: 'bold',
        fontSize: 20,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
      }
      
      
      
    });