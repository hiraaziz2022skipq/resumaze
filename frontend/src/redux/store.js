// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from "./testing/slice"

export const store = configureStore({
  reducer: {
    exampleSlice:exampleSlice
  },
});
