
// Importing necessary dependencies and components from various libraries
import { useState,useCallback, useMemo, useRef } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { StyleSheet,  View , FlatList, Text, Pressable} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { Fontisto, MaterialIcons } from '@expo/vector-icons'; 
import BottomSheet from '@gorhom/bottom-sheet';

import GoalItem from '../components/GoalItem';
import GoalInput from '../components/Goallinput';
import ShopCategoryItem from '../components/ShopCategoryItem';

import { addProduct, removeProduct, addToPickedItems } from '../store/redux/ShopingCartSlice';
import  uuid from 'react-native-uuid';

// Defining an array of shop categories for exemple
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

// Main component of the application
export default function App({navigation}) {
  
  // State variables
  const [bottomSheet, setBottomSheet] = useState(false)
  const[modalProductsIsVisible, setModalProductsIsVisible] = useState(false)
  
  
  // ref
  const bottomSheetRef = useRef(null);

  
  // variables
  const snapPoints = useMemo(() => ['1%', '65%'], []);

  // callbacks
  const handleSheetChanges = () => {
    
    
    

  }

  const handleExpandPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  
  // Accessing the Redux store dispatch function using the useDispatch hook
  const dispatch = useDispatch()

  // Accessing the Redux store using the useSelector hook
  const products = useSelector((state) => state.shoppingCart);

  // Filtering the products array to get only the picked items
  const pickedArray = products.allProducts.filter(p => p.picked)
  const numberOfPicked = pickedArray.length

    // Adding a date property to the picked items array using the map function
  const pickedArrayWithNewKey = pickedArray.map(p => ({ ...p, date: new Date() }));
  console.log(pickedArrayWithNewKey)
  
  // Function for adding a new product to the list
  function addGoalHandler(enteredGoalText , enteredGoalNumber ){
    
    dispatch(addProduct({text: enteredGoalText,number:  enteredGoalNumber, picked: false, id: uuid.v4()}))
    bottomSheetRef.current?.close();
    
  }

  // Function for deleting a product from the list
  function deleteGoalHandler(id) {
    dispatch(removeProduct(id))
  }

  

 
    // Function for handling the cancel button in the modal input form
  function onCancel() {
    bottomSheetRef.current?.close();
  }

    // Function for navigating to the receipts screen
  function receiptHandler () {
    navigation.navigate('קבלות');
  }

    // Function for moving picked items to a separate array and removing them from the main array
  function removeToPickedItems(){
    dispatch(addToPickedItems(pickedArrayWithNewKey))
    
    for (let i = 0; i < pickedArrayWithNewKey.length; i++) {
      dispatch(removeProduct(pickedArrayWithNewKey[i].id) )
    }
  }
  
  // Main render function of the component
return(

  <View style={styles.container}>
  <StatusBar style='dark' />
  <View>
    <FlatList
      data={shopCategories}
      renderItem={({ item }) => <ShopCategoryItem item={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
    />
  </View>

  <View style={styles.goalAddButton}>
    <Fontisto name='shopping-basket-add' color='green' size={34} onPress={handleExpandPress} />
    <MaterialIcons name="receipt-long" size={40} onPress={receiptHandler} />
  </View>
  <View style={styles.goalsContainer}>
    {products.allProducts.length > 0 ? (<View>
      <FlatList
        data={products.allProducts}
        
        renderItem={itemData => {
          return (
            <GoalItem
              text={itemData.item.text}
              number={itemData.item.number}
              isPicked={itemData.item.picked}
              id={itemData.item.id}
              onDeleteItem={deleteGoalHandler}
            />
          );
        }}
      />
      </View>
    ) : (
      <View style={styles.noItems}>
        <Pressable onPress={handleExpandPress}>
          <View>
            <Text style={styles.noItemsButton}>
              הוסף מוצרים לרשימה +
            </Text>
          </View>
        </Pressable>
      </View>
    )}
  </View>
        <View style={styles.buttonContainer}>
          <Pressable disabled={numberOfPicked === 0 ? true : false}  style={[styles.button, {borderColor:'lightgreen', borderWidth: 3, opacity: numberOfPicked === 0 ? 0 : 0.9}]} onPress={removeToPickedItems} ><Text style={{ color:'white',fontWeight: 'bold',fontSize:18, padding:10}} >אשר {numberOfPicked} מוצרים</Text></Pressable>
        </View>
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onClose={() => setBottomSheet(false)}
      style={styles.styleBottomSheet}
      
    >
    <View style={styles.contentContainer}>
      <GoalInput
        visible={modalProductsIsVisible}
        onAddGoal={addGoalHandler}
        onCancel={onCancel}
      />
    </View>
    </BottomSheet>
    </View>
    )
  }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop:20,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
      },
      styleBottomSheet:{
        backgroundColor: 'white',
        elevation: 55 ,
        
        borderRadius: 50,
        
        
        
      },
      buttonContainer:{
        marginTop:2,
        flexDirection:"row",
        
      },
      button: {
        
        
        position: 'absolute',
        right: 88,
        bottom: 10,
        width: 160,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
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
      },
      contentContainer: {
        flex: 1,
        backgroundColor: '#50C878',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        
        zIndex:2
      },
      
      
      
    });