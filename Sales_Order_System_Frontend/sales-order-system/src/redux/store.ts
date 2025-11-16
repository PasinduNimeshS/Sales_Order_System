import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/coustomerSlice';
import itemReducer from './slices/itemSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    items: itemReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;