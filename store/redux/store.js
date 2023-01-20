import { configureStore} from '@reduxjs/toolkit';
import AnimalsReducer from './AnimalsSlice';
import ShopingCartReducer from './ShopingCartSlice'
import TasksReducer from './TasksSlice';
import EventsReducer from './EventSlice';

export const store = configureStore({
  reducer: {
    animals: AnimalsReducer,
    shoppingCart: ShopingCartReducer,
    tasks: TasksReducer,
    events: EventsReducer,
  },
})

