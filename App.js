
import { useState, useEffect } from 'react';


import { StyleSheet,  View, SafeAreaView , Image, Text} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather ,EvilIcons, Ionicons, MaterialIcons} from '@expo/vector-icons'; 
import {createDrawerNavigator} from '@react-navigation/drawer'
import * as LocalAuthentication from 'expo-local-authentication';
import {Provider} from 'react-redux';


import HomeScreen from './screens/HomeScreen.js'
import Shoplist from './screens/Shoplist.js'
import ReceiptPicker from './screens/ReceiptPicker'
import Animals from './screens/Animals';
import Tasks from './screens/Tasks';
import NumberTasks from './components/NumberTasks';
import EventsCalendar from './screens/EventsCalendar.js';

import ShopingContextProvider from './store/context/Shoping-context.js';
import {store} from './store/redux/store'

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();


export default function App() {

  const [tasksNumber, setTasksNumber] = useState(0)
  
  useEffect(() => {
    async function authenticate() {
      const result = await LocalAuthentication.authenticateAsync()
    }
    authenticate();
  },[])
  
  
  return (
    <>
      <StatusBar style='dark'/>
      
        <View style={styles.container}>
          <SafeAreaView style={styles.container}>
            <ShopingContextProvider>
              <Provider store={store}>
                <NavigationContainer>
                  <Drawer.Navigator screenOptions={{
                    
                    headerTitleAlign: 'center',
                    headerRight: () => (
                       <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Feather style={{ marginHorizontal: 10}}  name='plus-square'  size={25} />
                        {/* <EvilIcons style={{ marginHorizontal: 10}} name='user' size={40} /> */}
                            {/* <Feather style={{ marginHorizontal: 10}}  name='bell'  size={25} /> */}
                            <NumberTasks  />
                        </View>
                    )}}
                    
                    
                    >

                    <Drawer.Screen name="דף ראשי" component={HomeScreen} options={{
                      drawerIcon: ({color, size}) => (
                        <Feather name='home' size={size} color={color}/>
                      ),
                    }}/>
                    <Drawer.Screen name="קבלות" component={ReceiptPicker} options={{
                      drawerIcon: ({color, size}) => (
                        <Ionicons name="receipt-outline" size={size} color={color} />
                      ),
                    }}/>
                    <Drawer.Screen name="רשימת קניות" component={Shoplist} options={{
                      drawerIcon: ({color, size}) => (
                        <Feather name='shopping-cart' size={size} color={color}/>
                      ),
                    }}/>
                    <Drawer.Screen name="בעלי חיים" component={Animals} options={{
                      drawerIcon: ({color, size}) => (
                        <MaterialIcons name='pets' size={size} color={color}/>
                      ),
                    }}/>
                    <Drawer.Screen name="מטלות כלליות" component={Tasks} options={{
                      drawerIcon: ({color, size}) => (
                        <MaterialIcons name='assignment' size={size} color={color}/>
                      ),
                      
                    }}/>
                    <Drawer.Screen name="אירועים" component={EventsCalendar} options={{
                      drawerIcon: ({color, size}) => (
                        <MaterialIcons name='event' size={size} color={color}/>
                      ),
                      
                    }}/>

                  </Drawer.Navigator>
                  {/* <Stack.Navigator screenOptions={{
                    headerTitleAlign: 'center',
                    headerRight: () => {
                      return <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}><Feather style={{ marginHorizontal: 10}} name='plus-square'  size={25} />
                              <EvilIcons name='user' size={40} /></View>
                    },
                    headerLeft: () => {
                      return <Feather name='menu' size={30} />
                    },
                    
                  }}>
                    <Stack.Screen name="דף ראשי" component={HomeScreen}/>
                    <Stack.Screen name="קבלות" component={ImagePicker} />
                    <Stack.Screen name="רשימת קניות" component={Shoplist} />
                  </Stack.Navigator> */}
                  {/* <Shoplist /> */}


                </NavigationContainer>
              </Provider> 
            </ShopingContextProvider>

            
          </SafeAreaView>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
});
