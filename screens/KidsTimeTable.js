
import { useState,useCallback, useEffect, useMemo, useRef } from 'react';import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet';
import AddKidsCalendar from '../components/AddKidsCalendar';
import KidsEvents from '../components/KidsEvents';

const KidsTimeTable = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayPosition, setSelectedDayPosition] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);

  const kidsCalendar = useSelector((state)=> state.daysCalendar)
  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

  const [width, setWidth] = useState(Dimensions.get("window").width);

  const [bottomSheet, setBottomSheet] = useState(false)
  
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

  function onCancel() {
    bottomSheetRef.current?.close();
  }


useEffect(() => {
  const updateLayout = () => {
    setWidth(Dimensions.get("window").width);
  };
  Dimensions.addEventListener("change", updateLayout);

  return () => {
    Dimensions.removeEventListener("change", updateLayout);
  };
  
}, []);

  

  const handleAddEvent = () => {
      
     
      setModalVisible(false);
    
  };
  

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    
    fadeOut()
    setTimeout(fadeIn,300)
  };


  const fadeIn = () => {
    // Will change selectedDayPosition value to 1 in 5 seconds
    Animated.timing(selectedDayPosition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change selectedDayPosition value to 0 in 3 seconds
    Animated.timing(selectedDayPosition, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleOneLetterDay = (day) => {
    switch (day) {
      case 'ראשון':
        return 'א';
        break;
      case 'שני':
        return 'ב';
        break;
      case 'שלישי':
        return 'ג';
        break;
      case 'רביעי':
        return 'ד';
        break;
      case 'חמישי':
        return 'ה';
        break;
      case 'שישי':
        return 'ו';
        break;
      case 'שבת':
        return 'ש';
                   
    }
  }

  return (
    <View style={styles.bigContainer}>
      
      <View style={styles.dayButtonsContainer}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayButton,
              selectedDay === day && { backgroundColor: 'lightgreen' },
            ]}
            onPress={() => handleSelectDay(day)}
          >
            <Text style={styles.dayButtonText}>{handleOneLetterDay(day)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView>
        {selectedDay ? (
          <Animated.View style={[
            styles.container,
            {
              transform: [
                {
                  translateX: selectedDayPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [width, 0],
                  }),
                },
              ],
            },
          ]}>
            
              <Text style={{paddingVertical: 18, fontSize: 24, fontWeight: 'bold'}}>{selectedDay}</Text>
            
              
              {selectedDay && kidsCalendar.allEvents
              .filter((obj) => obj.selectedDay === selectedDay)
              .length > 0 ? (
                kidsCalendar.allEvents
                  .filter((obj) => obj.selectedDay === selectedDay)
                  .sort((a, b) => {
                    const hourA = a.selectedHour.split(':');
                    const hourB = b.selectedHour.split(':');
                    return parseInt(hourA[0]) - parseInt(hourB[0]);
                  })
                  .map((obj) => (
                    <View
                      key={obj.id}
                      style={[styles.dayContainer, { borderColor: obj.color, borderWidth: 4 }]}
                    >
                      <Text style={{ color: 'lightgreen' }}>{obj.selectedHour}</Text>
                      <Text>{obj.description}</Text>
                    </View>
                  ))
              ) : (
                <View style={styles.dayContainer}>
                  <Text style={{textAlign: 'center'}}>אין מערכת שעות ליום זה</Text>
                </View>
              )}
          </Animated.View>
        ) : (<View style={styles.dayContainer}><Text>לחץ על היום שברצונך לראות</Text></View>)}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleExpandPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      
      

      <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onClose={() => setBottomSheet(false)}
      style={styles.styleBottomSheet}
      
    >
    <View style={styles.contentContainer}>
      <AddKidsCalendar visible={modalVisible} handleAddEvent={handleAddEvent} setModalVisible={onCancel}/>
    </View>
    </BottomSheet>          
     {/* {modalVisible === true  && <AddKidsCalendar visible={modalVisible} handleAddEvent={handleAddEvent} setModalVisible={setModalVisible}/>} */}
</View>
);
};

export default KidsTimeTable;

const styles = StyleSheet.create({
  bigContainer:{
    flex: 1,
    
  },
  container: {
    
    
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    padding:10,
    margin: 15,
    borderRadius: 15,
    elevation: 6
  },
  dayButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  dayButton: {
    width: 42,
    height: 42,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  daySlide: {
    padding: 20,
    alignItems: 'center',
  },
  dayContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    borderRadius: 15,
    margin: 8,
    
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addButton: {
  position: 'absolute',
  right: 10,
  bottom: 30,
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: '#50C878',
  alignItems: 'center',
  justifyContent: 'center',
  },
  addButtonText: {
  fontSize: 24,
  color: 'white',
  },
  modalContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  },
  modalTitle: {
  fontSize: 24,
  marginBottom: 20,
  },
  picker: {
  width: '80%',
  marginBottom: 20,
  },
  textInput: {
  width: '80%',
  padding: 10,
  borderWidth: 1,
  borderColor: 'gray',
  marginBottom: 20,
  },
  addEventButton: {
  width: '40%',
  padding: 10,
  backgroundColor: '#00BFFF',
  alignItems: 'center',
  },
  addEventButtonText: {
  fontSize: 18,
  color: 'white',
  },
  cancelButton: {
  width: '40%',
  padding: 10,
  backgroundColor: 'gray',
  alignItems: 'center',
  },
  cancelButtonText: {
  fontSize: 18,
  color: 'white',
  },
});