// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from '@/redux/slices/kanban'

export const store = configureStore({
  reducer: {
    kanbanReducer,
  },
});
