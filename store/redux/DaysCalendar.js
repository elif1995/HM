import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  allEvents:[],
  
}

export const DaysCalendar = createSlice({
  name: 'DaysCalendar',
  initialState,
  
  reducers:{
    addDaysEvents: (state, action) => {
      state.allEvents.push(action.payload)
      console.log(state.allEvents)
    },
    removeEvents: (state, action) => {
     
      state.allEvents.splice(state.allEvents.indexOf(action.payload.id), 1)
    },
    
  }
  
});


export default DaysCalendar.reducer;
export const addDaysEvents = DaysCalendar.actions.addDaysEvents;
export const removeEvents = DaysCalendar.actions.removeEvents;

