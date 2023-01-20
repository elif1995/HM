import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allAnimals:[],
  
}

export const AnimalsSlice = createSlice({
  name: 'Animals',
  initialState,
  
  reducers:{
    addAnimals: (state, action) => {
      state.allAnimals.push(action.payload)
    },
    removeAnimals: (state, action) => {
     
      state.allAnimals.splice(state.allAnimals.indexOf(action.payload.Name), 1)
    },
    editAnimals: (state, action) => {
      const index = state.allAnimals.findIndex((object) => {
        return object.Name === action.payload.Name
      });
      {action.payload.newImage !== undefined && (state.allAnimals[index].Image = action.payload.newImage)}
      {action.payload.newName !== undefined && (state.allAnimals[index].Name = action.payload.newName)}
      {action.payload.newAge !== undefined && (state.allAnimals[index].Age = action.payload.newAge)}
      {action.payload.newChipNumber !== undefined && (state.allAnimals[index].ChipNumber = action.payload.newChipNumber)}
      {action.payload.newAppointment !== undefined && (state.allAnimals[index].AppointmentData = action.payload.newAppointment)}
      {action.payload.newWalk !== undefined && (state.allAnimals[index].WalkNotifications = action.payload.newWalk)}
      
      
      
    }
  }
  
});


export default AnimalsSlice.reducer;
export const addAnimals = AnimalsSlice.actions.addAnimals;
export const removeAnimals = AnimalsSlice.actions.removeAnimals
export const editAnimals = AnimalsSlice.actions.editAnimals


