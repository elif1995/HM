import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  allTasks:[],
  
}

export const TasksSlice = createSlice({
  name: 'Tasks',
  initialState,
  
  reducers:{
    addTasks: (state, action) => {
      state.allTasks.push(action.payload)
      console.log(state.allTasks)
    },
    removeTasks: (state, action) => {
     
      state.allTasks.splice(state.allTasks.indexOf(action.payload.id), 1)
    },
    
  }
  
});


export default TasksSlice.reducer;
export const addTasks = TasksSlice.actions.addTasks;
export const removeTasks = TasksSlice.actions.removeTasks;


