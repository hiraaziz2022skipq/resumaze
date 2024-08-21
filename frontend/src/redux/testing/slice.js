// src/store/slices/exampleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    data:null
  },
  reducers: {
    addData: (state,{payload}) => {
      state.data = payload
    },
  },
});

export const { addData } = exampleSlice.actions;

export default exampleSlice.reducer;
