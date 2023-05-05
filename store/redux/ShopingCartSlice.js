import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts:[],
  allPickedItems:[]
}

export const ShopingCartSlice = createSlice({
  name: 'ShopingCart',
  initialState,
  
  reducers:{
    addProduct: (state, action) => {
      state.allProducts.push(action.payload)
      
    },
    removeProduct: (state, action) => {
      state.allProducts.splice(state.allProducts.findIndex((p) => {return p.id === action.payload}), 1)
    },
    editIsPicked: (state, action) => {
      const indexOfPicked = state.allProducts.findIndex((p) => { return p.id === action.payload.id})
      
      // console.log(action.payload.picked)
      state.allProducts[indexOfPicked].picked = (action.payload.isPicked == true ? false : true)
    },
    addToPickedItems: (state, action) => {
      state.allPickedItems.push(...action.payload)
    },
  }
  
});


export default ShopingCartSlice.reducer;
export const addProduct = ShopingCartSlice.actions.addProduct;
export const removeProduct = ShopingCartSlice.actions.removeProduct
export const editIsPicked = ShopingCartSlice.actions.editIsPicked
export const addToPickedItems = ShopingCartSlice.actions.addToPickedItems
