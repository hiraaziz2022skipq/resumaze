import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentResumeData: {},
  isCompleted: false,
  hasAtsGenerated: false,
  iselgforAtsScore: false,
  atsScore: null,
  resumePercentage: 0,
};

const CreateResume = createSlice({
  name: "CreateResume",
  initialState: initialState,
  reducers: {
    setCurrentResumeData: (state, { payload }) => {
      state.currentResumeData = {
        ...state.currentResumeData,
        payload,
      };
    },
    setProfilePercentage: (state, { payload }) => {
      state.resumePercentage = payload;
    },
    setEligibilityofATSScore: (state, { payload }) => {
      state.iselgforAtsScore = payload;
    },
  },
});

export const {
  setProfilePercentage,
  setEligibilityofATSScore,
} = CreateResume.actions;

export default CreateResume.reducer;
