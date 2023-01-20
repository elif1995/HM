import { createSlice } from '@reduxjs/toolkit';




export const EventSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    addEvents: (state, action) => {
      state.push(action.payload);
      
    }
   
  },
});

export default EventSlice.reducer;
export const addEvents = EventSlice.actions.addEvents;
