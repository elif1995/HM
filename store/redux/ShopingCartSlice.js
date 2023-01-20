import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts:[],
  
}

export const ShopingCartSlice = createSlice({
  name: 'ShopingCart',
  initialState,
  
  reducers:{
    addProduct: (state, action) => {
      state.allProducts.push(action.payload)
      
    },
    removeProduct: (state, action) => {
     
      state.allProducts.splice(state.allProducts.indexOf(action.payload), 1)
    }
  }
  
});


export default ShopingCartSlice.reducer;
export const addProduct = ShopingCartSlice.actions.addProduct;
export const removeProduct = ShopingCartSlice.actions.removeProduct
