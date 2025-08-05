import { configureStore } from '@reduxjs/toolkit';
import beansReducer from '../features/counter/beanSlice';
import authReducer from "../features/authSlice"


export const store = configureStore({
  reducer: {
    beans: beansReducer,
    auth : authReducer

  },
});
