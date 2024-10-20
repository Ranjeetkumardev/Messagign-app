
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/apiSlice'; 
import userReduder from "./features/userSlice"

export const store = configureStore({
  reducer: {
    usser : userReduder,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

