// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from '@/redux/slices/kanban'
import jobApplicationSlice from './job-tracker/slice'
import CreateResume from './create-resume/slice'
import resumesSlice from './resumes/slice'
export const store = configureStore({
  reducer: {
    kanbanReducer,
    jobApplicationSlice,
    CreateResume,
    resumesSlice
  },
});
