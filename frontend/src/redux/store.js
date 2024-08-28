// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from '@/redux/slices/kanban'
import jobApplicationSlice from './job-tracker/slice'

export const store = configureStore({
  reducer: {
    kanbanReducer,
    jobApplicationSlice
  },
});
