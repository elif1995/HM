import {createContext, useState} from 'react';


export const ShopingContext = createContext({
  list: [],
  addToList: (enteredGoalText, enteredGoalNumber) => {},
  removeFromList: (id) => {}
});

function ShopingContextProvider({children}) {

  const [shoppingItems, setShoppingItems] = useState([]);

  function addToList(enteredGoalText, enteredGoalNumber) {
    setShoppingItems((currentItem) => [...currentItem,{text: enteredGoalText,number: enteredGoalNumber, id: Math.random().toString()}])
  }

  function removeFromList(id) {
    setShoppingItems(currentItem => {return currentItem.filter((item) => item.id !== id)})
  }

  const value = {
    list: shoppingItems,
    addToList: addToList,
    removeFromList: removeFromList
  }

  return <ShopingContext.Provider value={value}>{children}</ShopingContext.Provider>
}

export default ShopingContextProvider
