import { createSlice } from '@reduxjs/toolkit';


const initialState = {logInState : false}


export const LoginSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    handleLogIn: (state, action) => {
      state.logInState = action.payload;
    },
    handleLogOut: (state, action) => {
      state.logInState = action.payload;
      
    }
   
  },
});

export default LoginSlice.reducer;
export const {handleLogIn, handleLogOut} = LoginSlice.actions;

